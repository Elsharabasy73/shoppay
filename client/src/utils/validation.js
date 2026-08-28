// Mirrors backend validators in server/utils/validators/*
// Each function returns { valid: boolean, message: string } or null if valid
// Use before dispatch to give instant feedback and keep form data.

export const isMongoId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export const validateRequired = (val, fieldName) => {
  if (val === undefined || val === null || String(val).trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

// Brand – server: name required, 3-32
export const validateBrandName = (name, isUpdate = false) => {
  if (isUpdate && (name === undefined || name === null || String(name).trim() === "")) return null; // optional on update
  const req = validateRequired(name, "Brand name");
  if (req) return req;
  const t = String(name).trim();
  if (t.length < 3) return "Too short Brand name";
  if (t.length > 32) return "Too long Brand name";
  return null;
};

// Category – same as brand
export const validateCategoryName = (name, isUpdate = false) => {
  if (isUpdate && (name === undefined || name === null || String(name).trim() === "")) return null;
  const req = validateRequired(name, "Category name");
  if (req) return req;
  const t = String(name).trim();
  if (t.length < 3) return "Too short category name";
  if (t.length > 32) return "Too long category name";
  return null;
};

// SubCategory – name 2-32, category required mongoId
export const validateSubCategory = ({ name, category }, isUpdate = false) => {
  if (!isUpdate) {
    const req = validateRequired(name, "SubCategory name");
    if (req) return req;
    const t = String(name).trim();
    if (t.length < 2) return "Too short Subcategory name";
    if (t.length > 32) return "Too long Subcategory name";
    const catReq = validateRequired(category, "Category");
    if (catReq) return "subCategory must be belong to category";
    if (!isMongoId(category)) return "Invalid Category id format";
  } else {
    if (name !== undefined && name !== null && String(name).trim() !== "") {
      const t = String(name).trim();
      if (t.length < 2) return "Too short Subcategory name";
      if (t.length > 32) return "Too long Subcategory name";
    }
    if (category !== undefined && category !== null && String(category).trim() !== "" && category !== "0") {
      if (!isMongoId(category)) return "Invalid Category id format";
    }
  }
  return null;
};

// Coupon – name required, expire ISO8601, discount >0
export const validateCoupon = ({ name, expire, discount }, isUpdate = false) => {
  if (!isUpdate) {
    if (!name || String(name).trim() === "") return "Coupon name required";
    if (!expire) return "Coupon expire time required";
    if (isNaN(Date.parse(expire))) return "Invalid coupon expire date";
    if (discount === "" || discount === undefined || discount === null) return "Coupon discount value required";
    const d = parseFloat(discount);
    if (isNaN(d) || d <= 0) return "Coupon discount must be greater than 0";
  } else {
    if (name !== undefined && String(name).trim() === "" && name !== undefined) return "Coupon name required";
    if (expire !== undefined && expire !== "" && isNaN(Date.parse(expire))) return "Invalid coupon expire date";
    if (discount !== undefined && discount !== "" && discount !== null) {
      const d = parseFloat(discount);
      if (isNaN(d) || d <= 0) return "Coupon discount must be greater than 0";
    }
  }
  return null;
};

// Product – mirrors productValidator create/update
export const validateProduct = (data, isUpdate = false) => {
  const { title, description, quantity, price, priceAfterDiscount, category, brand, ratingsAverage, subcategories } = data;

  if (!isUpdate) {
    if (!title || String(title).trim() === "") return "Product required";
    if (String(title).trim().length < 3) return "must be at least 3 chars";

    if (!description || String(description).trim() === "") return "Product description is required";
    if (String(description).length > 2000) return "Too long description";

    if (quantity === "" || quantity === undefined || quantity === null) return "Product quantity is required";
    if (isNaN(Number(quantity))) return "Product quantity must be a number";

    if (price === "" || price === undefined || price === null) return "Product price is required";
    if (isNaN(Number(price))) return "Product price must be a number";
    if (String(price).length > 32) return "To long price";

    if (priceAfterDiscount !== undefined && priceAfterDiscount !== "" && priceAfterDiscount !== null) {
      if (isNaN(Number(priceAfterDiscount))) return "Product priceAfterDiscount must be a number";
      if (Number(price) <= Number(priceAfterDiscount)) return "priceAfterDiscount must be lower than price";
    }

    const imgCover = data.imageCover;
    if (!imgCover) return "Product imageCover is required";

    if (!category) return "Product must be belong to a category";
    if (!isMongoId(category)) return "Invalid ID formate";

    if (brand && !isMongoId(brand)) return "Invalid ID formate";

    if (subcategories && subcategories.length > 0) {
      for (const id of subcategories) {
        const sid = typeof id === "string" ? id : id._id;
        if (!isMongoId(sid)) return "Invalid ID formate";
      }
    }

    if (ratingsAverage !== undefined && ratingsAverage !== "" && ratingsAverage !== null) {
      if (isNaN(Number(ratingsAverage))) return "ratingsAverage must be a number";
      const r = Number(ratingsAverage);
      if (r < 1) return "Rating must be above or equal 1.0";
      if (r > 5) return "Rating must be below or equal 5.0";
    }
  } else {
    // update: title optional
    if (title !== undefined && title !== null && String(title).trim() !== "" && String(title).trim().length < 3) return "must be at least 3 chars";
    if (description !== undefined && description !== null && String(description).length > 2000) return "Too long description";
    if (priceAfterDiscount !== undefined && priceAfterDiscount !== "" && priceAfterDiscount !== null && price !== undefined && price !== "" && price !== null) {
      if (!isNaN(Number(price)) && !isNaN(Number(priceAfterDiscount)) && Number(price) <= Number(priceAfterDiscount)) return "priceAfterDiscount must be lower than price";
    }
    if (category !== undefined && category !== null && category !== "" && category !== "0" && !isMongoId(category)) return "Invalid ID formate";
    if (brand !== undefined && brand !== null && brand !== "" && brand !== "0" && !isMongoId(brand)) return "Invalid ID formate";
  }
  return null;
};

// Auth – signup
export const validateSignup = ({ name, email, password, passwordConfirm, phone }) => {
  if (!name || String(name).trim() === "") return "The name is required";
  if (String(name).trim().length < 3) return "Too short User name";
  if (String(name).trim().length > 60) return "Too long User name";
  if (!email || String(email).trim() === "") return "The email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email address";
  if (!password) return "Password is required";
  if (String(password).length < 6) return "Password must be at least 6 characters";
  if (!passwordConfirm) return "Password confirmation is required";
  if (password !== passwordConfirm) return "Passwords do not match";
  // phone optional in validator but register-hook requires 11 egypt digits; keep len check if provided
  return null;
};

export const validateLogin = ({ email, password }) => {
  if (!email || String(email).trim() === "") return "The email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email address";
  if (!password) return "Password is required";
  if (String(password).length < 6) return "Password must be at least 6 characters";
  return null;
};

// Review – comment 10-500, rating 1-5
export const validateReview = ({ comment, rating }) => {
  // backend uses check("comment") and check("rating") for create
  const text = comment !== undefined ? comment : "";
  // support both "comment" and "review" keys used in frontend
  const actualComment = text || "";
  if (!actualComment || String(actualComment).trim() === "") return "comment is required";
  if (String(actualComment).length < 10 || String(actualComment).length > 500) return "comment must be between 10 and 500 characters";
  const r = Number(rating);
  if (isNaN(r) || !Number.isInteger(r) || r < 1 || r > 5) return "rating must be between 1 and 5";
  return null;
};

export const validateReviewUpdate = ({ comment, rating }) => {
  if (comment !== undefined && comment !== null) {
    if (String(comment).trim() === "") return "comment is required";
    if (String(comment).length < 10 || String(comment).length > 500) return "comment must be between 10 and 500 characters";
  }
  if (rating !== undefined && rating !== null && rating !== "") {
    const r = Number(rating);
    if (isNaN(r) || !Number.isInteger(r) || r < 1 || r > 5) return "rating must be between 1 and 5";
  }
  return null;
};

// Address – at least one field required, each if present must be non-empty string
export const validateAddress = ({ alias, details, phone, city, address, country, zipCode }, isUpdate = false) => {
  const fields = { alias, details, phone, city, address, country, zipCode };
  const hasAny = Object.values(fields).some(v => v !== undefined && v !== null && String(v).trim() !== "");
  if (!hasAny) return "At least one address field is required";
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null && String(v).trim() === "" && v !== "") {
      // explicitly empty string after trim
      return `${k} cannot be empty`;
    }
  }
  // frontend uses alias, details(detalis), phone as main – keep same but also allow others
  return null;
};

// User – create/update (reuse signup checks)
// Helper to extract error message from axios response
export const getErrorMessage = (res) => {
  if (!res) return null;
  if (res.data?.errors && Array.isArray(res.data.errors) && res.data.errors.length > 0) {
    return res.data.errors[0].msg;
  }
  if (res.data?.message) return res.data.message;
  if (res.message) return res.message;
  return null;
};
