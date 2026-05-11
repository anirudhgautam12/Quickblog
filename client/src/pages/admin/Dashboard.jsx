import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../CONTEXT/Appcontext'
import toast from 'react-hot-toast'
import Blogtableitem from '../../components/admin/Blogtabelitem'

const Dashboard = () => {
const [isMounted, setIsMounted] = useState(false);
const [dashboardData, setDashboardData] = useState({
    blogs:0,
    comments:0,
    drafts:0,
    recentBlogs:[]
})
const { axios } = useAppContext();

const fetchDashboard = async()=>{
    try {
        const { data } = await axios.get('/api/admin/dashboard');
        if (data.success) {
            setDashboardData(data.DashboardData); // Notice uppercase D based on adminController
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}
useEffect(()=>{
    fetchDashboard()
    setIsMounted(true)
},[])

  return (
    <div className={`flex-1 p-4 md:p-10 bg-transparent overflow-y-auto transition-all duration-700 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, Admin 👋</h1>
        <p className="text-slate-500 mt-1">Here is what's happening with your blog today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex items-center gap-5 bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-inner group-hover:scale-110 transition-transform duration-300">
            <img src={assets.dashboard_icon_1} className="w-7 h-7" alt="" />
          </div>
          <div>
            <p className='text-3xl font-extrabold text-slate-800'>{dashboardData.blogs}</p>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">Total Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-5 bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-inner group-hover:scale-110 transition-transform duration-300">
            <img src={assets.dashboard_icon_2} className="w-7 h-7" alt="" />
          </div>
          <div>
            <p className='text-3xl font-extrabold text-slate-800'>{dashboardData.comments}</p>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-5 bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner group-hover:scale-110 transition-transform duration-300">
            <img src={assets.dashboard_icon_3} className="w-7 h-7" alt="" />
          </div>
          <div>
            <p className='text-3xl font-extrabold text-slate-800'>{dashboardData.drafts}</p>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">Drafts</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/60 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-lg shadow-slate-200/40 overflow-hidden">
        <div className='flex items-center gap-3 px-6 py-5 border-b border-slate-100 bg-slate-50/50'>
            <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
              <img src={assets.dashboard_icon_4} className="w-4 h-4" alt="" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Latest Blogs</h2>
        </div>
        
        <div className='w-full overflow-x-auto'>
            <table className='w-full text-sm text-left text-slate-600'>
                <thead className='text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100'>
                    <tr>
                        <th scope='col' className='px-2 py-4 xl:px-6' >#</th>
                        <th scope='col' className='px-2 py-4'>Blog Title</th>
                        <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                        <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                        <th scope='col' className='px-2 py-4'>Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {dashboardData.recentBlogs.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-slate-500">
                          <p className="text-lg font-medium text-slate-600">No recent blogs found</p>
                          <p className="text-sm mt-1">Start writing to see your blogs here!</p>
                        </td>
                      </tr>
                    ) : (
                      dashboardData.recentBlogs.map((blog,index)=>{
                          return <Blogtableitem key={blog._id} blog={blog} fetchblogs={fetchDashboard} index={index+1}/>
                      })
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
