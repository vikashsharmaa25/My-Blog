export const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const value = email.trim().toLowerCase();
  // Basic, practical email pattern (avoid over-restricting valid emails)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(value);
};

export const isValidPhone = (phone) => {
  if (typeof phone !== "string") return false;
  // Remove spaces, dashes, parentheses. Keep leading + if any.
  const normalized = phone.trim().replace(/[^\d+]/g, "");
  // Accept either:
  // - 10 digits (common local mobile)
  // - optional +country code (1-3 digits) followed by 10-12 digits total
  // Keeps it practical without over-restricting.
  const re = /^(?:\+\d{1,3})?\d{10}$/;
  return re.test(normalized);
};

export const getPasswordStrength = (password) => {
  if (typeof password !== "string") return { score: 0, label: "empty" };
  const len = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const classes = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean)
    .length;

  if (len < 6) return { score: 0, label: "too short" };
  if (len >= 10 && classes >= 3) return { score: 3, label: "strong" };
  if (len >= 8 && classes >= 2) return { score: 2, label: "good" };
  return { score: 1, label: "weak" };
};
