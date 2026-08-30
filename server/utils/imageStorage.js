const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary");

// STORAGE env: "local" (default) or "cloudinary" (case-insensitive)
const isCloudinary = () => (process.env.STORAGE || "local").toLowerCase() === "cloudinary";

// Ensure local directory exists
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Upload buffer directly to Cloudinary using upload_stream
 * @param {Buffer} buffer - image buffer (already resized if needed)
 * @param {string} filename - e.g. product-xxx.jpg (extension will be stripped for public_id)
 * @param {string} folder - cloudinary folder e.g. "products", "categories"
 * @returns {Promise<string>} filename (DB stores filename, URL built via FILES_STORAGE_URL without version)
 */
const uploadImageCloudinary = (buffer, filename, folder) => {
  const publicId = filename.replace(/\.[^/.]+$/, ""); // strip extension
  const cloudinaryFolder = `shoppay/${folder}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: cloudinaryFolder,
        public_id: publicId,
        resource_type: "image",
        format: "jpg",
      },
      (error, result) => {
        if (error) return reject(error);
        // Return filename only - no version. FILES_STORAGE_URL builds version-free URL:
        // https://res.cloudinary.com/<cloud>/image/upload/shoppay/<folder>/<filename>
        resolve(filename);
      },
    );
    stream.end(buffer);
  });
};

/**
 * Save buffer to local uploads folder
 * @param {Buffer} buffer
 * @param {string} filename
 * @param {string} folder
 * @returns {Promise<string>} filename (stored value for DB)
 */
const uploadImageLocal = async (buffer, filename, folder) => {
  const uploadPath = path.join(__dirname, "..", "uploads", folder);
  ensureDirExists(uploadPath);
  const filePath = path.join(uploadPath, filename);
  await fs.promises.writeFile(filePath, buffer);
  return filename;
};

/**
 * Main entry – checks STORAGE env and delegates
 * @param {Buffer} buffer - raw buffer from multer (or already sharp processed)
 * @param {string} filename - desired filename with extension
 * @param {string} folder - subfolder: products | categories | brands | user
 * @returns {Promise<string>} stored identifier (filename for both local and cloudinary - version-free)
 */
const uploadImage = async (buffer, filename, folder) => {
  if (isCloudinary()) {
    return uploadImageCloudinary(buffer, filename, folder);
  }
  return uploadImageLocal(buffer, filename, folder);
};

/**
 * Helper: sharp resize + delegate to uploadImage
 * Keeps controller code clean
 * @param {Buffer} inputBuffer
 * @param {string} filename
 * @param {string} folder
 * @param {{width:number,height:number,quality:number}} options
 * @returns {Promise<string>}
 */
const processAndUploadImage = async (inputBuffer, filename, folder, options = {}) => {
  const { width, height, quality = 95 } = options;
  let pipeline = sharp(inputBuffer);
  if (width || height) {
    pipeline = pipeline.resize(width, height);
  }
  pipeline = pipeline.toFormat("jpeg").jpeg({ quality });
  const outputBuffer = await pipeline.toBuffer();
  return uploadImage(outputBuffer, filename, folder);
};

/**
 * Extract filename from a stored identifier (filename or full URL)
 * @param {string} identifier
 * @returns {string} filename e.g. product-xxx.jpg
 */
const getFilenameFromIdentifier = (identifier) => {
  if (!identifier) return null;
  // If it's a URL (local BASE_URL or cloudinary), take last segment after '/'
  if (identifier.includes("://")) {
    try {
      const url = new URL(identifier);
      const pathname = url.pathname; // /products/product-xxx.jpg or /.../shoppay/products/xxx.jpg
      const parts = pathname.split("/");
      return parts[parts.length - 1] || identifier;
    } catch {
      return identifier.split("/").pop();
    }
  }
  // Plain filename
  return identifier;
};

/**
 * Delete a single image from the configured storage
 * Handles both local (filename or local URL) and cloudinary (secure_url)
 * Never throws – logs and resolves
 * @param {string} identifier - filename or full URL stored in DB
 * @param {string} folder - local/cloud folder: products | categories | brands | user
 */
const deleteImage = async (identifier, folder) => {
  if (!identifier) return;
  const filename = getFilenameFromIdentifier(identifier);
  if (!filename) return;

  if (isCloudinary()) {
    // If identifier looks like a local URL/filename but STORAGE is cloudinary,
    // we still try cloudinary delete (old local entries will just be not found – harmless)
    // For a real cloudinary identifier the file lives at shoppay/<folder>/<publicId>
    if (identifier.startsWith("http://") || identifier.startsWith("https://")) {
      // Only attempt cloudinary delete if URL contains cloudinary domain or shoppay folder
      // For local BASE_URL URLs when STORAGE=cloudinary (migrated data), skip cloudinary delete and try local
      const isCloudinaryUrl = identifier.includes("cloudinary.com") || identifier.includes("shoppay");
      if (!isCloudinaryUrl && identifier.includes(process.env.BASE_URL || "localhost")) {
        // Fall through to local delete attempt for legacy local URLs
      } else {
        const publicId = `shoppay/${folder}/${filename.replace(/\.[^/.]+$/, "")}`;
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        } catch (err) {
          console.error(`Cloudinary delete failed for ${publicId}:`, err.message);
        }
        return;
      }
    } else {
      // Plain filename but STORAGE is cloudinary – treat as cloudinary publicId
      const publicId = `shoppay/${folder}/${filename.replace(/\.[^/.]+$/, "")}`;
      try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      } catch (err) {
        console.error(`Cloudinary delete failed for ${publicId}:`, err.message);
      }
      return;
    }
  }

  // Local storage delete (also fallback for legacy local files when STORAGE=cloudinary)
  try {
    const filePath = path.join(__dirname, "..", "uploads", folder, filename);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  } catch (err) {
    console.error(`Local delete failed for ${folder}/${filename}:`, err.message);
  }
};

const deleteImages = async (identifiers, folder) => {
  if (!Array.isArray(identifiers) || identifiers.length === 0) return;
  await Promise.all(identifiers.map((id) => deleteImage(id, folder)));
};

module.exports = {
  uploadImage,
  uploadImageLocal,
  uploadImageCloudinary,
  processAndUploadImage,
  isCloudinary,
  deleteImage,
  deleteImages,
  getFilenameFromIdentifier,
};
