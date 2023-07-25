const express = require("express");
const { CreateNewUser } = require("../controller/user");

const router = express.Router();

//Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      // validations
      throw Error("All fields are required");
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      throw Error("Invalid name");
    } else if (password.length < 8) {
      throw Error("Password must be at least 8 characters");
    } else if (!/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email address");
    } else {
      // trim spaces from end
      name = name.trim();
      email = email.trim();
      password = password.trim();

      // Create a new user
      const newUser = await CreateNewUser({ name, email, password });
      res
        .status(200)
        .json({ name: newUser.name, email: newUser.email, id: newUser._id });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
