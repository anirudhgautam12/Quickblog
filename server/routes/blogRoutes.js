import express from "express";
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish, likeBlog, likeComment } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();
blogRouter.post("/add",auth,upload.single("image"),addBlog)
blogRouter.get("/all",getAllBlogs)
blogRouter.get("/:id",getBlogById)
blogRouter.post('/delete/:id',auth,deleteBlogById)
blogRouter.patch('/:id/toggle-publish', auth, togglePublish);
blogRouter.post('/add-comment',addComment)
 blogRouter.post('/comments',getBlogComments)
 blogRouter.post('/:id/like', likeBlog);
 blogRouter.post('/comment/:id/like', likeComment);

 
export default blogRouter;