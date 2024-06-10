const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getError } = require("../constants");

const registeruser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      return next(getError("All fields are required", 400));
      // return  res.status(400).send({ message: "All fields are required" });
    }
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return next(getError("User already registered", 400));
      // return res.status(400).send({ message: "User already registered" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    res
      .status(201)
      .json({ message: "User registered Successfully", data: user });
  } catch (error) {
    next(error.message, 500);
    // res.status(500).send({ message: error.message });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return next(getError("All fields are required", 400));
      // return res.status(400).send({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          username: user.username,
          email: user.email,
          id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "20m",
        }
      );
      const cookieOptions = {
        httpOnly: true, // Prevent client-side JavaScript access
        // secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
        maxAge: 1000 * 60 * 60, // Set cookie expiration time (1 hour)
      };

      res.cookie("jwt", accessToken, cookieOptions);
      return res.status(200).json({ accessToken });
    } else {
      return next(getError("email or password is not valid", 401));
      // res.status(401).send({ message: "email or password is not valid" });
    }
  } catch (error) {
    next(getError(error.message, 500));
    // res.status(500).send({ message: error.message });
  }
};

const currentUser = (req, res) => {
  res.json({ data: req.user });
};

module.exports = {
  registeruser,
  loginUser,
  currentUser,
};
