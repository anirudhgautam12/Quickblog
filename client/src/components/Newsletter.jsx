import React, { useState } from 'react'
import { useAppContext } from '../CONTEXT/Appcontext'
import toast from 'react-hot-toast'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { axios } = useAppContext();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Basic frontend email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/subscribe', { email });
      if (data.success) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 mt-32 mb-16'>
      <div className='flex flex-col items-center justify-center text-center space-y-4 py-16 px-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-white shadow-xl shadow-indigo-100/50'>
        <h1 className='md:text-4xl text-3xl font-bold text-gray-800 tracking-tight'>Never Miss Our Blog!</h1>
        <p className='md:text-lg text-gray-500 max-w-xl pb-6'>
          Subscribe to our newsletter to stay updated with the latest news, tutorials, and exclusive content.
        </p>
        <form onSubmit={handleSubscribe} className='flex items-center justify-between max-w-lg w-full bg-white rounded-full p-1.5 border border-gray-200 shadow-sm focus-within:shadow-md focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-400/20 transition-all duration-300'>
          <input 
            className='h-12 outline-none w-full px-6 text-gray-700 bg-transparent placeholder-gray-400' 
            type="email" 
            placeholder="Enter your email address..." 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`h-12 px-8 text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all rounded-full whitespace-nowrap shadow-sm hover:shadow-md ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 active:scale-95 cursor-pointer'}`}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter
