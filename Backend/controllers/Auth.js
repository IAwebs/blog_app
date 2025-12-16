import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { FileUploadeToColoudinary } from "../libs/Cloudinary.js";
import UserModal from "../models/User.js";

/* ================= REGISTER ================= */
const Register = async (req, res) => {
  try {
    const { FullName, email, password } = req.body;

    if (!FullName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existUser = await UserModal.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    let profileImage = "";

    // ✅ Upload image to Cloudinary (RENDER SAFE)
    if (req.file) {
      const cloudinaryResult = await FileUploadeToColoudinary(
        req.file.path,
        "user_profiles"
      );
      profileImage = cloudinaryResult.secure_url;

      // remove local temp file
      fs.unlinkSync(req.file.path);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModal.create({
      FullName,
      email,
      password: hashedPassword,
      profile: profileImage,
    });

    // ❌ Never return password
    newUser.password = undefined;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

/* ================= LOGIN ================= */
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found. Please register.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // ✅ Correct cookie settings for Render + React
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* ================= LOGOUT ================= */
const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

/* ================= UPDATE PROFILE ================= */
const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { FullName, oldpassword, newpassword } = req.body;

    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (oldpassword) {
      const isMatch = await bcrypt.compare(oldpassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect",
        });
      }
    }

    if (FullName) user.FullName = FullName;

    if (oldpassword && newpassword) {
      user.password = await bcrypt.hash(newpassword, 10);
    }

    await user.save();
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

export { Register, Login, Logout, updateProfile };
