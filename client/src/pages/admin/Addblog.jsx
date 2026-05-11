import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill  from 'quill'
import { useAppContext } from '../../CONTEXT/Appcontext'
import toast from 'react-hot-toast'

const Addblog = () => {
  const {axios}=useAppContext();
  const [isAdding,setIsAdding]=useState(false)
    const editorRef= useRef(null)
    const quillRef = useRef(null);

    const [image, setImage] = useState(false)
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [category, setCategory] = useState('Startup')
    const [isPublished, setIsPublished] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const generatecontent = async () => {
      if (!title) {
        toast.error("Please provide a Blog Title first!");
        return;
      }
      try {
        setIsGenerating(true);
        const { data } = await axios.post("/api/ai/generate-blog", { title, subtitle });
        
        if (data.success) {
          if (quillRef.current) {
            quillRef.current.root.innerHTML = data.content;
            toast.success("Content generated successfully!");
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to generate content");
      } finally {
        setIsGenerating(false);
      }
    }

    useEffect(()=>{
        setIsMounted(true)
    },[])

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    setIsAdding(true);

    const blog = {
      title,
      subtitle,
      description: quillRef.current.root.innerHTML, // fixed typo: decription → description
      category,
      isPublished,
    };

    const formdata = new FormData();
    formdata.append("blog", JSON.stringify(blog));
    formdata.append("image", image);

    // ✅ await here
    const { data } = await axios.post("/api/blog/add", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data.success) {
      toast.success(data.message);
      setImage(false);
      setTitle("");
      setSubtitle("");
      setCategory("Startup");
      quillRef.current.root.innerHTML = "";
      setIsPublished(false);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setIsAdding(false);
  }
};


    useEffect(()=>{
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: "snow" });
        }
    },[])

  return (
    <div className={`flex-1 p-4 md:p-10 bg-transparent overflow-y-auto transition-all duration-700 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Create New Blog</h1>
        <p className="text-slate-500 mt-1">Write and publish a new blog post.</p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white/60 backdrop-blur-xl w-full max-w-3xl p-6 md:p-10 shadow-lg shadow-slate-200/40 rounded-3xl border border-slate-100"
      >
        <p className="font-semibold text-slate-700 mb-3">Upload Thumbnail</p>
        <label htmlFor="image" className="block w-max">
          <div className={`relative flex items-center justify-center w-40 h-24 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ${!image ? 'border-indigo-300 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50' : 'border-transparent'}`}>
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="Upload"
              className={`object-cover ${!image ? 'w-10 opacity-60' : 'w-full h-full'}`}
            />
            {!image && <div className="absolute inset-0 bg-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity"></div>}
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        <div className="mt-8">
          <p className="font-semibold text-slate-700 mb-2">Blog Title</p>
          <input
            type="text"
            placeholder="Type Here"
            required
            className="w-full max-w-lg px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 placeholder-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 transition-all font-medium"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="mt-6">
          <p className="font-semibold text-slate-700 mb-2">Sub Title</p>
          <input
            type="text"
            placeholder="Type Here"
            required
            className="w-full max-w-lg px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 placeholder-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 transition-all font-medium"
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
          />
        </div>
        <div className="mt-6">
          <p className="font-semibold text-slate-700 mb-2">Blog Description</p>
          <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-400/20 transition-all">
            <div ref={editorRef} className="border-none h-[220px]"></div>
            <button
              className={`absolute bottom-3 right-3 text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm flex items-center gap-1 ${isGenerating ? 'bg-indigo-200 text-indigo-500 cursor-not-allowed' : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 cursor-pointer'}`}
              type="button"
              onClick={generatecontent}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Generate AI
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold text-slate-700 mb-2">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="w-full max-w-xs px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 transition-all font-medium appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
          >
            <option value="">Select Category</option>
            {blogCategories.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <div className='flex items-center gap-3 mt-8 bg-slate-50 border border-slate-200 p-4 rounded-xl max-w-max'>
          <input
            type="checkbox"
            id="publishCheck"
            checked={isPublished}
            className="w-5 h-5 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer accent-indigo-600"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="publishCheck" className="font-medium text-slate-700 cursor-pointer select-none">
            Publish immediately
          </label>
        </div>

        <button 
          disabled={isAdding} 
          type="submit" 
          className='mt-10 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl cursor-pointer text-sm shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center min-w-[160px] disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {isAdding ? (
            <div className="flex items-center gap-2">
               <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Publishing...
            </div>
          ) : "Publish Blog Post"}
        </button>
      </form>
    </div>
  );
}

export default Addblog
