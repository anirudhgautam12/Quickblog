import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../CONTEXT/Appcontext';

const Unsubscribe = () => {
  const { token } = useParams();
  const { axios } = useAppContext();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleUnsubscribe = async () => {
      try {
        const { data } = await axios.get(`/api/subscribe/unsubscribe/${token}`);
        if (data.success) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message);
        }
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || "Something went wrong.");
      }
    };

    if (token) {
      handleUnsubscribe();
    }
  }, [token, axios]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {status === 'loading' && (
        <div className="space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Processing your request...</h2>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-4 max-w-md bg-green-50 p-8 rounded-lg shadow-sm border border-green-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Unsubscribed</h2>
          <p className="text-gray-600 pb-4">{message}</p>
          <Link to="/" className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-all">
            Return to Homepage
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4 max-w-md bg-red-50 p-8 rounded-lg shadow-sm border border-red-100">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
            ✕
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Oops!</h2>
          <p className="text-gray-600 pb-4">{message}</p>
          <Link to="/" className="inline-block bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-all">
            Return to Homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default Unsubscribe;
