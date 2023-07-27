const User = require("../models/user");
const bcrypt = require("bcrypt");
const { hashData, verifyHashData } = require("../utils/hashData");
const createToken = require("../utils/createToken");

const AuthenticateUser = async (data) => {
  try {
    const { email, password } = data;
    const fetchedUser = await User.findOne({ email });
    if (fetchedUser) {
      if (!fetchedUser.verified) {
        throw Error("Email has not been verified yet, Check your email");
      }

      const hashedPassword = fetchedUser.password;
      const passwordMatch = await verifyHashData(password, hashedPassword);
      if (passwordMatch) {
        // create user token
        const token = await createToken({ userID: fetchedUser._id, email });
        // assign user token
        fetchedUser.token = token;
        return fetchedUser;
      } else {
        throw Error("Incorrect Password");
      }
    } else {
      throw Error("Incorrect Email Address");
    }
  } catch (error) {
    throw error;
  }
};

const CreateNewUser = async (data) => {
  try {
    let { name, email, password } = data;

    // Check if User Already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User with this email already exists");
    }

    // hash password
    const hashedPassword = await hashData(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verified: false,
    });
    // Create a new user

    const createdUser = await newUser.save();

    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { CreateNewUser, AuthenticateUser };
