/* eslint-disable no-undef */
/* global require */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const app = express();
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const URL = process.env.MONGO_URL;

console.log(SECRET_KEY, URL);

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized user!!!" });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = user;
    next();
  });
};

mongoose.connect(
  "mongodb+srv://aman5612:hUw42fXicveWNNc6@cluster0.cqhprto.mongodb.net/?retryWrites=true&w=majority",
  { dbName: "Advisoropedia" }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const User = mongoose.model("User", {
  profilePicture: String,
  name: String,
  email: String,
  password: String,
});

app.get("/verify/:token", (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Verification successful: ", decoded);
    res.render("verification", { token, verificationStatus: "success" });
  } catch (error) {
    console.log("Verification failed: ", error.message);
    let verificationStatus;
    if (error.name === "TokenExpiredError") {
      verificationStatus = "Token Expired";
    } else if (error.name === "JsonWebTokenError") {
      verificationStatus = "Invalid Token";
    } else {
      verificationStatus = "Verification Failed";
    }

    res.render("verification", { token, verificationStatus });
  }
});

app.get("/", authenticateUser, (req, res) => {
  res.send("Welcome to Advisoropedia");
});

app.get("/login-token", authenticateUser, (req, res) => {
  console.log(req.body);
  const { profilePicture, name, email, password } = req.body;
  res.send({ profilePicture, name, email, password });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    const hashedPassword = user.password;
    const comparePasswords = async (plainPassword, hashedPassword) => {
      return await bcrypt.compare(plainPassword, hashedPassword);
    };
    const isMatch = await comparePasswords(password, hashedPassword);

    if (isMatch) {
      const token = jwt.sign(
        { email: user.email, password: user.password },
        SECRET_KEY,
        {
          expiresIn: "10h",
        }
      );
      res.json({ message: "Login successful", token });
    } else {
      res.json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { profilePicture, name, email, password } = req.body;

    const hashPassword = async (password) => {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    };

    const newPassword = await hashPassword(password);

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.email === email) {
      const redirectUrl = `http://localhost:5173/login`;
      res.redirect(redirectUrl);
    } else {
      const user = await User.create({
        profilePicture,
        name,
        email,
        password: newPassword,
      });

      const token = jwt.sign(
        { email: user.email, password: user.password },
        SECRET_KEY,
        {
          expiresIn: "10h",
        }
      );

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Welcome to Advisoropedia",
        text: `Welcome to Advisoropedia, ${name}. Your account has been created successfully. We are excited to have you on board.`,
        html: `<p>Click the following link to verify your account: <a href="http://localhost:5173/verify/${token}">Verify</a></p>`,
      };

      await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email verification error:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Email sent ");
          res.redirect(`http://localhost:5173/check-email?token=${token}`);
        }
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
