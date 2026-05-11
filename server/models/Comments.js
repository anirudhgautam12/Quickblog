import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
   blog:{type:mongoose.Schema.Types.ObjectId,ref:"blog",required:true},
   name:{type:String,required:true},
    content:{type:String,required:true},
    isApproved:{type:Boolean,default:false},
    likes: { type: Number, default: 0 },
    likedByIPs: { type: [String], default: [] }
  },
  { timestamps: true });
 const Comment = mongoose.model("Comment", commentSchema)

 export default Comment;
