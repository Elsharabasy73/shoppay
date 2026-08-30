const fs = require("fs");
const path = require("path");

const Product = require("../models/productModel");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const { getFilenameFromIdentifier, isCloudinary } = require("./imageStorage");

const UPLOADS_ROOT = path.join(__dirname, "..", "uploads");

// Each domain maps a filesystem folder to how its filenames are collected from DB.
// Filenames are normalized via getFilenameFromIdentifier so stored URLs and plain
// filenames are both handled.
const CLEANUP_TARGETS = [
  {
    folder: "products",
    label: "Products",
    collectFilenames: async () => {
      const docs = await Product.find().select("imageCover images").lean();
      const files = [];
      docs.forEach((doc) => {
        const cover = getFilenameFromIdentifier(doc.imageCover);
        if (cover) files.push(cover);
        if (Array.isArray(doc.images)) {
          doc.images.forEach((img) => {
            const name = getFilenameFromIdentifier(img);
            if (name) files.push(name);
          });
        }
      });
      return files;
    },
  },
  {
    folder: "brands",
    label: "Brands",
    collectFilenames: async () => {
      const docs = await Brand.find().select("image").lean();
      return docs
        .map((doc) => getFilenameFromIdentifier(doc.image))
        .filter(Boolean);
    },
  },
  {
    folder: "categories",
    label: "Categories",
    collectFilenames: async () => {
      const docs = await Category.find().select("image").lean();
      return docs
        .map((doc) => getFilenameFromIdentifier(doc.image))
        .filter(Boolean);
    },
  },
  {
    folder: "user",
    label: "Users",
    collectFilenames: async () => {
      const docs = await User.find().select("profileImg").lean();
      return docs
        .map((doc) => getFilenameFromIdentifier(doc.profileImg))
        .filter(Boolean);
    },
  },
];

const stripExtension = (filename) => filename.replace(/\.[^/.]+$/, "");

const listLocalFiles = async (folder) => {
  const dirPath = path.join(UPLOADS_ROOT, folder);
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => !name.startsWith("."));
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
};

const cleanupLocalFolder = async (target) => {
  const { folder, label, collectFilenames } = target;
  const referenced = await collectFilenames();
  const referencedSet = new Set(referenced);

  const filesOnDisk = await listLocalFiles(folder);

  // Files on disk that are not referenced in DB are orphans
  const orphans = filesOnDisk.filter((filename) => !referencedSet.has(filename));

  let deleted = 0;
  let errors = 0;

  await Promise.all(
    orphans.map(async (filename) => {
      const filePath = path.join(UPLOADS_ROOT, folder, filename);
      try {
        await fs.promises.unlink(filePath);
        deleted += 1;
        console.log(`[cleanup] Deleted orphan ${label} image: ${folder}/${filename}`);
      } catch (err) {
        errors += 1;
        console.error(`[cleanup] Failed to delete ${folder}/${filename}: ${err.message}`);
      }
    }),
  );

  return {
    label,
    folder,
    referenced: referenced.length,
    totalFiles: filesOnDisk.length,
    orphans: orphans.length,
    deleted,
    errors,
  };
};

const cleanupCloudinaryFolder = async (target) => {
  const { folder, label, collectFilenames } = target;
  // Lazy-require cloudinary so local-only setups without credentials still work
  let cloudinary;
  try {
    cloudinary = require("../config/cloudinary");
  } catch (err) {
    console.warn(`[cleanup] Skipping cloudinary cleanup for ${folder}: cannot load config (${err.message})`);
    return null;
  }

  const hasCloudinaryCreds =
    process.env.CLOUDNARY_NAME || process.env.CLOUDINARY_NAME;
  if (!hasCloudinaryCreds) {
    console.warn(`[cleanup] Skipping cloudinary cleanup for ${folder}: missing cloudinary credentials`);
    return null;
  }

  const referenced = await collectFilenames();
  const referencedBases = new Set(referenced.map(stripExtension));

  const prefix = `shoppay/${folder}`;
  let nextCursor;
  let totalResources = 0;
  let deleted = 0;
  let errors = 0;
  let orphanCount = 0;

  do {
    let result;
    try {
      result = await cloudinary.api.resources({
        type: "upload",
        prefix,
        max_results: 500,
        next_cursor: nextCursor,
      });
    } catch (err) {
      // Cloudinary returns 420 when prefix has no resources – treat as empty
      if (err.error && err.error.http_code === 420) {
        break;
      }
      console.error(`[cleanup] Cloudinary list failed for ${prefix}: ${err.message}`);
      break;
    }

    const resources = result.resources || [];
    totalResources += resources.length;

    await Promise.all(
      resources.map(async (resource) => {
        const publicId = resource.public_id; // e.g. shoppay/products/product-xxx
        const baseName = publicId.split("/").pop();
        if (!referencedBases.has(baseName)) {
          orphanCount += 1;
          try {
            await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
            deleted += 1;
            console.log(`[cleanup] Deleted orphan cloudinary ${label} image: ${publicId}`);
          } catch (err) {
            errors += 1;
            console.error(`[cleanup] Failed to delete cloudinary ${publicId}: ${err.message}`);
          }
        }
      }),
    );

    nextCursor = result.next_cursor;
  } while (nextCursor);

  return {
    label: `${label} (cloudinary)`,
    folder: `${prefix}`,
    referenced: referencedBases.size,
    totalFiles: totalResources,
    orphans: orphanCount,
    deleted,
    errors,
  };
};

/**
 * Main orphan cleanup – scans local uploads (and cloudinary when STORAGE=cloudinary).
 * - Collects all referenced filenames from DB per domain.
 * - Lists files on disk per uploads/<folder>.
 * - Deletes any file on disk whose filename is not in the referenced set.
 */
const cleanupOrphanImages = async ({ dryRun = false } = {}) => {
  const cloudinaryMode = isCloudinary();
  const results = [];

  console.log(`[cleanup] Starting orphan image cleanup (STORAGE=${process.env.STORAGE || "local"}, dryRun=${dryRun}) at ${new Date().toISOString()}`);

  for (const target of CLEANUP_TARGETS) {
    try {
      if (dryRun) {
        const referenced = await target.collectFilenames();
        const referencedSet = new Set(referenced);
        const filesOnDisk = await listLocalFiles(target.folder);
        const orphans = filesOnDisk.filter((f) => !referencedSet.has(f));
        console.log(
          `[cleanup][dryRun] ${target.label} (${target.folder}): ${filesOnDisk.length} on disk, ${referenced.length} referenced, ${orphans.length} orphans => ${orphans.join(", ") || "none"}`,
        );
        results.push({
          label: target.label,
          folder: target.folder,
          referenced: referenced.length,
          totalFiles: filesOnDisk.length,
          orphans: orphans.length,
          deleted: 0,
          errors: 0,
        });
        continue;
      }

      // Always attempt local cleanup – handles legacy local files even when cloudinary is active
      const localResult = await cleanupLocalFolder(target);
      results.push(localResult);
      console.log(
        `[cleanup] ${localResult.label} (${localResult.folder}): ${localResult.totalFiles} on disk, ${localResult.referenced} referenced, ${localResult.orphans} orphans, ${localResult.deleted} deleted`,
      );

      if (cloudinaryMode) {
        const cloudinaryResult = await cleanupCloudinaryFolder(target);
        if (cloudinaryResult) {
          results.push(cloudinaryResult);
          console.log(
            `[cleanup] ${cloudinaryResult.label} (${cloudinaryResult.folder}): ${cloudinaryResult.totalFiles} on cloudinary, ${cloudinaryResult.referenced} referenced, ${cloudinaryResult.orphans} orphans, ${cloudinaryResult.deleted} deleted`,
          );
        }
      }
    } catch (err) {
      console.error(`[cleanup] Failed for ${target.label} (${target.folder}): ${err.message}`);
      results.push({
        label: target.label,
        folder: target.folder,
        error: err.message,
      });
    }
  }

  const totalDeleted = results.reduce((sum, r) => sum + (r.deleted || 0), 0);
  const totalOrphans = results.reduce((sum, r) => sum + (r.orphans || 0), 0);
  console.log(`[cleanup] Done. Total orphans: ${totalOrphans}, deleted: ${totalDeleted}`);

  return results;
};

// Scheduler – runs every 4 hours using setInterval (no extra dependency).
let cleanupIntervalId = null;

const startOrphanCleanupSchedule = (intervalMs = 4 * 60 * 60 * 1000) => {
  if (cleanupIntervalId) {
    console.warn("[cleanup] Schedule already started, skipping duplicate start");
    return cleanupIntervalId;
  }

  console.log(`[cleanup] Scheduling orphan cleanup every ${intervalMs / 1000 / 60} minutes`);

  // Run once shortly after server start (gives DB time to connect), then on interval
  const initialDelayMs = 10 * 1000;
  const runSafely = async () => {
    try {
      // Skip if mongoose not yet connected
      const mongoose = require("mongoose");
      if (mongoose.connection.readyState !== 1) {
        console.log("[cleanup] Skipping run – DB not connected yet");
        return;
      }
      await cleanupOrphanImages();
    } catch (err) {
      console.error(`[cleanup] Scheduled run failed: ${err.message}`);
    }
  };

  setTimeout(runSafely, initialDelayMs);
  cleanupIntervalId = setInterval(runSafely, intervalMs);

  // Do not keep process alive solely for this timer in tests
  if (cleanupIntervalId.unref) cleanupIntervalId.unref();

  return cleanupIntervalId;
};

const stopOrphanCleanupSchedule = () => {
  if (cleanupIntervalId) {
    clearInterval(cleanupIntervalId);
    cleanupIntervalId = null;
    console.log("[cleanup] Schedule stopped");
  }
};

// CLI support: node utils/cleanupOrphanImages.js [--dry-run]
if (require.main === module) {
  require("dotenv").config({ path: path.join(__dirname, "..", "config.env") });
  const dbConnection = require("../config/database");
  const mongoose = require("mongoose");

  const dryRun = process.argv.includes("--dry-run");

  (async () => {
    dbConnection();
    // Wait briefly for connection
    const maxWaitMs = 10000;
    const start = Date.now();
    while (mongoose.connection.readyState !== 1 && Date.now() - start < maxWaitMs) {
      await new Promise((res) => setTimeout(res, 500));
    }
    if (mongoose.connection.readyState !== 1) {
      console.error("[cleanup] DB connection failed, aborting CLI run");
      process.exit(1);
    }
    await cleanupOrphanImages({ dryRun });
    await mongoose.connection.close();
    process.exit(0);
  })();
}

module.exports = {
  cleanupOrphanImages,
  startOrphanCleanupSchedule,
  stopOrphanCleanupSchedule,
  CLEANUP_TARGETS,
};
