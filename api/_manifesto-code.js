// Six digit verification codes for the Manifesto flow.
//
// The code is generated here and mailed. Only a hash reaches the database, so
// a database read does not hand anyone a working code. The pepper lives in the
// environment, which is what stops someone who can call the RPC from building
// hashes and grinding a six digit space.

const crypto = require("crypto");

const CODE_TTL_SECONDS = 900; // 15 minutes

function pepper() {
  const value = process.env.MANIFESTO_CODE_PEPPER;
  if (!value) {
    throw new Error("MANIFESTO_CODE_PEPPER is not configured.");
  }
  return value;
}

// Uniform over 000000-999999. Modulo on a random byte string would bias the
// low end, which matters when the whole space is only a million wide.
function generateCode() {
  return String(crypto.randomInt(0, 1000000)).padStart(6, "0");
}

// Bound to the address so a hash captured for one email cannot be replayed
// against another.
function hashCode(email, code) {
  const normalized = String(email || "").trim().toLowerCase();
  const digits = String(code || "").trim();
  return crypto
    .createHmac("sha256", pepper())
    .update(normalized + ":" + digits)
    .digest("hex");
}

function isSixDigits(value) {
  return /^[0-9]{6}$/.test(String(value || "").trim());
}

module.exports = {
  CODE_TTL_SECONDS,
  generateCode,
  hashCode,
  isSixDigits
};
