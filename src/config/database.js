require("dotenv").config();
const mongoose = require("mongoose");

const { MONGODB_URI, MONGODB_URI2 } = process.env;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

connectToDatabase();
