import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../CONTEXT/Appcontext";
import toast from "react-hot-toast";

const Commenttableitem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        const { data } = await axios.post("/api/admin/delete-comment", { id: _id });
        if (data.success) {
          toast.success(data.message);
          fetchComments();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
            {comment.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{comment.name}</h3>
            <p className="text-xs text-slate-500">{BlogDate.toLocaleDateString()}</p>
          </div>
        </div>
        {!comment.isApproved ? (
          <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded-full">
            Pending
          </span>
        ) : (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider rounded-full">
            Approved
          </span>
        )}
      </div>

      <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 mb-6 flex-1">
        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide font-medium">On Blog:</p>
        <p className="text-sm font-semibold text-indigo-900 mb-3 truncate">{blog.title}</p>
        <p className="text-slate-600 text-sm leading-relaxed">"{comment.content}"</p>
      </div>

      <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-slate-100">
        {!comment.isApproved && (
          <button
            onClick={approveComment}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors shadow-sm"
            title="Approve"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        )}
        <button
          onClick={deleteComment}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Commenttableitem;
