const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const AdminSecret = require("../models/adminSecrets.model.js");

module.exports.registerUser = async (req, res) => {
  try {
    let { name, emailId, password } = req.body;
    // checking adminPassword---
    let currentSecret = await AdminSecret.findOne();
    if (!currentSecret || password !== currentSecret.secret) {
      return res
        .status(401)
        .json({ message: "Invalid admin password!", success: false });
    }

    let registeredUser = await User.findOne({ emailId });
    // Check if it's outdated user
    if (registeredUser) {
      if (registeredUser.regSecret !== currentSecret.secret) {
        // Delete old user
        await User.deleteOne({ emailId });
      } else {
        return res
          .status(400)
          .json({ message: "User already registered!", success: false });
      }
    }

    // convert password into hash ----
    const hashpassword = await bcrypt.hash(password, 10);
    let newUser = await new User({
      name: name,
      emailId: emailId,
      password: hashpassword,
      role: "user",
      regSecret: currentSecret.secret,
    });
    console.log(newUser);
    await newUser.save();

    // create JWT Token---
    const token = jwtToken.sign(
      { id: newUser._id, emailId: newUser.emailId, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    res.status(200).json({
      message: "Successfully Registered!",
      token,
      name: newUser.name,
      emailId: newUser.emailId,
      role: newUser.role,
      success: true,
    });
  } catch (err) {
    console.log("error during registration of  user :", err);
    res.status(500).json({ message: "server error !", success: false });
  }
};



module.exports.loginUser = async (req, res) => {
  try {
    let { emailId, password } = req.body;
    let user = await User.findOne({ emailId });

    // checking user -----
    if (!user) {
      return res.status(400).json({ message: "user is not found" });
    }

    let currentSecret = await AdminSecret.findOne();

    // checking admin password--
    if (user.role === "user" && user.regSecret !== currentSecret.secret) {
      return res
        .status(403)
        .json({ message: " Please register with updated admin password." });
    }

    // checking password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password is incorrect!" });
    }

    // create token for keep the user loggedIn ------
    const token = jwtToken.sign(
      { id: user._id, emailId: user.emailId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      message: "Successfully login !",
      token,
      user: {
        name: user.name,
        emailId: user.emailId,
        role: user.role,
        success: true,
      },
    });
  } catch (err) {
    console.log("error during login :", err);
    res.status(500).json({ message: "some error occur during login !" });
  }
};

