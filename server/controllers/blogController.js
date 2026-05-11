import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comments.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Use buffer (if available from multer memoryStorage) else fallback to fs
    const fileBuffer = imageFile.buffer || fs.readFileSync(imageFile.path);

    // Upload image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Optimized image URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto compression
        { format: "webp" },  // Convert to modern format
        { width: "1280" },   // Resize width
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    res.status(201).json({
      success: true,
      message: "Blog Added Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;  // better than req.body
    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id }); // Delete associated comments
    res.json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;  // <-- use params, not body
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: "Blog publish status toggled successfully", blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const {blog,name,content}=req.body
    await Comment.create({blog,name,content})
    res.json({ success: true, message: "Comment added for Review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
export const getBlogComments = async (req, res) => {
  try {
    const {id}=req.body
    const comments=await Comment.find({blog:id,isApproved:true}).sort({createdAt:-1})
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = req.ip || req.connection.remoteAddress;

    const blog = await Blog.findById(id);
    if (!blog) return res.json({ success: false, message: "Blog not found" });

    if (blog.likedByIPs && blog.likedByIPs.includes(ip)) {
      return res.json({ success: false, message: "You already liked this blog!" });
    }

    blog.likes = (blog.likes || 0) + 1;
    if (!blog.likedByIPs) blog.likedByIPs = [];
    blog.likedByIPs.push(ip);
    
    await blog.save();

    res.json({ success: true, message: "Blog liked!", likes: blog.likes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = req.ip || req.connection.remoteAddress;

    const comment = await Comment.findById(id);
    if (!comment) return res.json({ success: false, message: "Comment not found" });

    if (comment.likedByIPs && comment.likedByIPs.includes(ip)) {
      return res.json({ success: false, message: "You already liked this comment!" });
    }

    comment.likes = (comment.likes || 0) + 1;
    if (!comment.likedByIPs) comment.likedByIPs = [];
    comment.likedByIPs.push(ip);
    
    await comment.save();

    res.json({ success: true, message: "Comment liked!", likes: comment.likes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
