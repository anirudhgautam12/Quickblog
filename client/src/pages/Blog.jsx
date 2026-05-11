import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../CONTEXT/Appcontext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { axios } = useAppContext();

  const fetchblogdata = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments`, { id: id });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };
const addcomment = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`/api/blog/add-comment`, {
      name,
      content,
      blog: id,   // 👈 fix here
    });

    if (data.success) {
      setName("");
      setContent("");
      toast.success(data.message);
      fetchComments(); // refresh immediately
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const likeBlog = async () => {
  try {
    const { data: resData } = await axios.post(`/api/blog/${id}/like`);
    if (resData.success) {
      setData((prev) => ({ ...prev, likes: resData.likes }));
    } else {
      toast.error(resData.message);
    }
  } catch (error) {
    toast.error("Failed to like blog");
  }
};

const likeComment = async (commentId) => {
  try {
    const { data: resData } = await axios.post(`/api/blog/comment/${commentId}/like`);
    if (resData.success) {
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, likes: resData.likes } : c))
      );
    } else {
      toast.error(resData.message);
    }
  } catch (error) {
    toast.error("Failed to like comment");
  }
};


  useEffect(() => {
    fetchblogdata();
    fetchComments();
  }, []);
  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary ">
          Michael Brown
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        
        {/* Blog Like Button */}
        <div className="max-w-3xl mx-auto mt-8 flex items-center gap-4">
          <button 
            onClick={likeBlog}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-gray-700">{data.likes || 0} Likes</span>
          </button>
        </div>

        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="bg-primary/2 relative border border-primary/5 max-w-xl p-4 rounded text-gray-600"

              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-4 text-xs text-gray-500">
                  <button onClick={() => likeComment(item._id)} className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>{item.likes || 0}</span>
                  </button>
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>
        {}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addcomment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="comment"
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              required
            ></textarea>
            <button
              type="submit"
             className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"

            >
              Submit
            </button>
          </form>
        </div>
        {}
        <div className="max-w-3xl my-24 mx-auto">
          <p className="font-semibold my-4">
            Share this Article on Social Media
          </p>
          <div className="flex">
            <img src={assets.facebook_icon} width={50} alt="" />
            <img src={assets.twitter_icon} width={50} alt="" />
            <img src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
