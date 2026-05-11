import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../CONTEXT/Appcontext";

const Header = () => {
  const {setInput,input} = useAppContext();
  const inputRef=useRef()

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    setInput(inputRef.current.value);
    
  }
  const onClear=()=>{
    setInput("");
    inputRef.current.value="";
  }

  return (
    <div className="mx:8 sm:mx-16 xl:mx-24 relative mb-24">
      <div className="text-center mt-20 mb-12">
        <div
          className="inline-flex items-center justify-center gap-4 px-6 
        py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm
         text-primary"
        >
          <p>New: AI Feature Integrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="" />
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold sm:leading-tight text-gray-800 tracking-tight mt-6">
          Your Own <span className="text-primary">Blogging</span> <br />{" "}
          Platform
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>
        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg max-sm:scale-90 mx-auto border border-gray-200 bg-white rounded-full overflow-hidden shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-400/20 transition-all duration-300">
            <input ref={inputRef} type="text" placeholder="Search for blogs..." required className="w-full pl-6 text-gray-700 outline-none placeholder-gray-400" />
            <button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-8 py-3 m-1.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm" >Search</button>
        </form>
      </div>
      <div className="text-center">
        {input &&<button onClick={onClear} className="border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 font-medium text-xs py-1.5 px-4 rounded-full shadow-sm transition-all cursor-pointer mt-4">Clear search</button>}
      </div>
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
