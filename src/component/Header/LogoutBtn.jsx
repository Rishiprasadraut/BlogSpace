import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const logoutHandler = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button 
        className="inline-flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium text-sm group"
        onClick={() => setShowConfirm(true)}
        disabled={loading}
      >
        <svg className="w-4 h-4 group-hover:text-red-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Sign Out</span>
      </button>
      
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Sign Out?</h3>
              <p className="text-slate-600 mb-6">Are you sure you want to sign out of your account?</p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-200 font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  onClick={logoutHandler}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors duration-200 font-medium disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing out...</span>
                    </div>
                  ) : (
                    'Sign Out'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutBtn;
