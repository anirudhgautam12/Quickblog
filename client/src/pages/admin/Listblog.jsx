import React, { useEffect, useState } from 'react'
import Blogtableitem from '../../components/admin/Blogtabelitem'
import { useAppContext } from '../../CONTEXT/Appcontext'
import toast from 'react-hot-toast'

const Listblog = () => {
    const [blogs, setBlogs] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    const { axios } = useAppContext();

    const fetchblogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs');
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        fetchblogs()
        setIsMounted(true)
    },[])
  return (
    <div className={`flex-1 p-4 md:p-10 bg-transparent overflow-y-auto transition-all duration-700 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Blog Lists</h1>
        <p className="text-slate-500 mt-1">Manage and edit your published and drafted blogs.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-lg shadow-slate-200/40 overflow-hidden">
        <div className='flex items-center gap-3 px-6 py-5 border-b border-slate-100 bg-slate-50/50'>
            <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                 <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-800">All Blogs</h2>
        </div>

        <div className='w-full overflow-x-auto'>
            <table className='w-full text-sm text-left text-slate-600'>
                <thead className='text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100'>
                    <tr>
                        <th scope='col' className='px-4 py-4 xl:px-6' >#</th>
                        <th scope='col' className='px-4 py-4'>Blog Title</th>
                        <th scope='col' className='px-4 py-4 max-sm:hidden'>Date</th>
                        <th scope='col' className='px-4 py-4 max-sm:hidden'>Status</th>
                        <th scope='col' className='px-4 py-4'>Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {blogs.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-slate-500">
                          <p className="text-lg font-medium text-slate-600">No blogs found</p>
                        </td>
                      </tr>
                    ) : (
                      blogs.map((blog,index)=>{
                          return <Blogtableitem key={blog._id} blog={blog} fetchblogs={fetchblogs} index={index+1}/>
                      })
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Listblog
