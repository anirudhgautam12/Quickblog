import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/sidebar';
import { useAppContext } from '../../CONTEXT/Appcontext';


const Layout = () => {
  const navigate = useNavigate();
  const { setToken, axios } = useAppContext();
  
  const logout=()=>{
   setToken(null);
   localStorage.removeItem("token");
   delete axios.defaults.headers.common["Authorization"];
   navigate('/')
  }
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen text-slate-800">
      <div className="flex items-center justify-between py-3 h-[70px] px-4 sm:px-12 bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <img
          src={assets.logo}
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
          alt=""/>
        <button
          onClick={logout}
          className="text-sm px-6 py-2 bg-white border border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 shadow-sm rounded-full cursor-pointer transition-all duration-200 font-medium">
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  );
}

export default Layout
