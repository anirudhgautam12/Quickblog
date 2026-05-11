import React, { useEffect, useState } from "react";
import { useAppContext } from "../../CONTEXT/Appcontext";
import toast from "react-hot-toast";
import Commenttableitem from "../../components/admin/Commenttableitem";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [isMounted, setIsMounted] = useState(false);
  const { axios } = useAppContext();
  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
    setIsMounted(true);
  }, []);
  return (
    <div className={`flex-1 p-4 md:p-10 bg-transparent overflow-y-auto transition-all duration-700 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Comments</h1>
          <p className="text-slate-500 mt-1">Review and manage user comments.</p>
        </div>
        <div className="flex gap-3 bg-white/60 backdrop-blur-xl p-1.5 rounded-xl border border-slate-200 shadow-sm w-max">
          <button
            onClick={() => setFilter("Not Approved")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === "Not Approved" ? "bg-amber-100 text-amber-700 shadow-sm" : "text-slate-600 hover:bg-slate-100"
            } `}
          >
            Pending Review
          </button>
          <button
            onClick={() => setFilter("Approved")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === "Approved" ? "bg-emerald-100 text-emerald-700 shadow-sm" : "text-slate-600 hover:bg-slate-100"
            } `}
          >
            Approved
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {comments.filter((comment)=>{
            if(filter==="Approved") return  comment.isApproved===true;
            return comment.isApproved === false;   
        }).length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white/60 backdrop-blur-xl border border-slate-100 rounded-2xl">
             <p className="text-lg font-medium text-slate-600">No {filter.toLowerCase()} comments found.</p>
          </div>
        ) : (
          comments.filter((comment)=>{
              if(filter==="Approved") return  comment.isApproved===true;
              return comment.isApproved === false;   
          }).map((comment,index)=><Commenttableitem key={comment._id} comment={comment} index={index+1} fetchComments={fetchComments}/>)
        )}
      </div>
    </div>
  );
};

export default Comments;
