import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../CONTEXT/Appcontext";
import toast from "react-hot-toast";

const Blogtableitem = ({ blog, fetchblogs, index }) => {
  const { axios } = useAppContext();
  const { title, createdAt, _id } = blog;
  const BlogDate = new Date(createdAt);

  const togglePublish = async () => {
    try {
      const { data } = await axios.patch(`/api/blog/${_id}/toggle-publish`);
      if (data.success) {
        toast.success(data.message);
        fetchblogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteBlog = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this blog?")) {
        const { data } = await axios.post(`/api/blog/delete/${_id}`);
        if (data.success) {
          toast.success(data.message);
          fetchblogs();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors duration-150">
      <th className="px-6 py-4 font-medium text-slate-500 w-12"> {index}</th>
      <td className="px-6 py-4 font-medium text-slate-800">{title}</td>
      <td className="px-6 py-4 max-sm:hidden text-slate-500 whitespace-nowrap">{BlogDate.toDateString()}</td>
      <td className="px-6 py-4 max-sm:hidden">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
            blog.isPublished 
              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
              : "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${blog.isPublished ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
          {blog.isPublished ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-6 py-4 flex items-center gap-2">
        <button 
          onClick={togglePublish} 
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            blog.isPublished
              ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
              : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
          }`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"} 
        </button>
        <button 
          onClick={deleteBlog} 
          className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-100"
          title="Delete blog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Blogtableitem;
