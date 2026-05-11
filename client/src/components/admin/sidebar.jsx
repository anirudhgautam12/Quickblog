import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";


const Sidebar = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-indigo-950 to-purple-950 border-r border-indigo-900/50 min-h-full pt-6 w-[80px] md:w-[280px] shadow-[4px_0_24px_rgba(49,46,129,0.15)] z-40 relative">
      <NavLink
        end={true}
        to={"/admin"}
        className={({ isActive }) =>
          `flex items-center gap-4 py-3.5 px-4 md:px-8 mx-3 mb-2 rounded-xl cursor-pointer transition-all duration-300 group ${
            isActive ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] font-semibold" : "text-indigo-200 hover:bg-white/5 hover:text-white"
          } `
        }>
          <img src={assets.home_icon} className="min-w-4 w-5 opacity-90 group-hover:opacity-100 transition-opacity filter invert brightness-0 saturate-100" alt="" />
          <p className="hidden md:inline-block tracking-wide">Dashboard</p>
      </NavLink>

      <NavLink
        to={"/admin/addblog"}
        className={({ isActive }) =>
          `flex items-center gap-4 py-3.5 px-4 md:px-8 mx-3 mb-2 rounded-xl cursor-pointer transition-all duration-300 group ${
            isActive ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] font-semibold" : "text-indigo-200 hover:bg-white/5 hover:text-white"
          } `
        }>
          <img src={assets.add_icon} className="min-w-4 w-5 opacity-90 group-hover:opacity-100 transition-opacity filter invert brightness-0 saturate-100" alt="" />
          <p className="hidden md:inline-block tracking-wide">Add Blogs</p>
      </NavLink>

       <NavLink
        to={"/admin/listblog"}
        className={({ isActive }) =>
          `flex items-center gap-4 py-3.5 px-4 md:px-8 mx-3 mb-2 rounded-xl cursor-pointer transition-all duration-300 group ${
            isActive ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] font-semibold" : "text-indigo-200 hover:bg-white/5 hover:text-white"
          } `
        }>
          <img src={assets.list_icon} className="min-w-4 w-5 opacity-90 group-hover:opacity-100 transition-opacity filter invert brightness-0 saturate-100" alt="" />
          <p className="hidden md:inline-block tracking-wide">Blog Lists </p>
      </NavLink>

       <NavLink
        to={"/admin/comments"}
        className={({ isActive }) =>
          `flex items-center gap-4 py-3.5 px-4 md:px-8 mx-3 mb-2 rounded-xl cursor-pointer transition-all duration-300 group ${
            isActive ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] font-semibold" : "text-indigo-200 hover:bg-white/5 hover:text-white"
          } `
        }>
          <img src={assets.comment_icon} className="min-w-4 w-5 opacity-90 group-hover:opacity-100 transition-opacity filter invert brightness-0 saturate-100" alt="" />
          <p className="hidden md:inline-block tracking-wide">Comments </p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
