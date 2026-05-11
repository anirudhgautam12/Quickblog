import React from "react";
import { useNavigate } from "react-router-dom";

const Blogcard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="group w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer flex flex-col h-full">
      <div className="overflow-hidden aspect-video">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <span className="mb-3 px-3 py-1 self-start bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold tracking-wide uppercase border border-indigo-100/50">
          {category}
        </span>
        <h5 className="mb-3 font-bold text-gray-800 text-lg leading-tight line-clamp-2">{title}</h5>
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed flex-1" dangerouslySetInnerHTML={{"__html":description}}></p>
      </div>
    </div>
  );
};

export default Blogcard;
