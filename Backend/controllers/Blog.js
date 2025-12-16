import BlogModel from "../models/Blog.js";
import { FileUploadeToColoudinary } from "../libs/Cloudinary.js"; // Your Cloudinary helper
import fs from "fs";

/* ================= CREATE BLOG ================= */
const Create = async (req, res) => {
  try {
    const { title, desc } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const cloudResult = await FileUploadeToColoudinary(req.file.path, "blog_images");

    // Remove local temp file
    fs.unlinkSync(req.file.path);

    const newBlog = await BlogModel.create({
      title,
      desc,
      image: cloudResult.secure_url, // Store URL instead of local filename
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* ================= UPDATE BLOG ================= */
const update = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const blogId = req.params.id;

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (title) blog.title = title;
    if (desc) blog.desc = desc;

    // If new image uploaded
    if (req.file) {
      const cloudResult = await FileUploadeToColoudinary(req.file.path, "blog_images");
      fs.unlinkSync(req.file.path);
      blog.image = cloudResult.secure_url;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* ================= GET ALL POSTS ================= */
const GetPosts = async (req, res) => {
  try {
    const posts = await BlogModel.find();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ success: false, message: "No blogs found" });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* ================= DELETE BLOG ================= */
const DeleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // No need to delete local file; image is in Cloudinary
    // Optionally: you can delete image from Cloudinary if needed

    await BlogModel.findByIdAndDelete(blogId);

    res.status(200).json({ success: true, message: "Blog deleted successfully", post: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { Create, update, GetPosts, DeleteBlog };
