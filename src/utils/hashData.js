const bcrypt = require("bcrypt");
const salt = 10;

const hashData = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
const verifyHashData = async (unhashed, hashed) => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    throw error;
  }
};

module.exports = { hashData, verifyHashData };
