const User = require("../models/user");
const bcrypt = require("bcrypt");
const CreateNewUser = async (data) => {
  try {
    let { name, email, password } = data;

    // Check if User Already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User with this email already exists");
    }
    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      // salt
      10
    );
    console.log("hashPassword", hashedPassword);
    const newUser = new User({ name, email, password: hashedPassword });
    // Create a new user
    const createdUser = await newUser.save();
    console.log("createdUser", createdUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { CreateNewUser };
