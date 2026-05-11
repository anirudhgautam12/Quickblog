import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../CONTEXT/Appcontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { setToken, axios } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the slide-up animation shortly after mount
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 font-sans">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse delay-1000"></div>

      <div 
        className={`relative z-10 w-full max-w-md p-8 md:p-10 m-4 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_0_50px_rgba(139,92,246,0.25)] transition-all duration-1000 ease-out transform ${isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
      >
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Logo / Icon */}
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-white/70 mb-2 drop-shadow-sm">
            Welcome Back
          </h1>
          <p className="text-white/60 font-light mb-8">
            Enter your credentials to access the Admin Panel
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                required
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl outline-none text-white placeholder-transparent hover:bg-white/15 focus:bg-white/15 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all peer font-medium"
                placeholder="Email Address"
              />
              <label 
                htmlFor="email" 
                className="absolute left-5 top-4 text-white/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-purple-300 peer-valid:top-1 peer-valid:text-[11px]"
              >
                Email Address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                required
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl outline-none text-white placeholder-transparent hover:bg-white/15 focus:bg-white/15 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all peer font-medium"
                placeholder="Password"
              />
              <label 
                htmlFor="password" 
                className="absolute left-5 top-4 text-white/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-purple-300 peer-valid:top-1 peer-valid:text-[11px]"
              >
                Password
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors drop-shadow-sm">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`relative w-full py-4 mt-6 overflow-hidden font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-[0.97] ${isLoading ? 'opacity-80 cursor-not-allowed hover:scale-100' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span>Secure Login</span>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
