import React, { useState } from "react";
import authServices from "../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button, Logo } from "./index";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const password = watch("password");

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authServices.createAccount(data);
      if (userData) {
        const currentUser = await authServices.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Logo width="24px" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BlogSpace
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Join our community</h1>
          <p className="text-slate-600">Create your account and start sharing your stories</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit(create)} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.name?.message}
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              })}
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email address"
                }
              })}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Password must contain uppercase, lowercase, and number"
                }
              })}
            />
            
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
            />
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Password strength:</p>
                <div className="flex space-x-1">
                  <div className={`h-2 w-1/4 rounded-full ${
                    password.length >= 8 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}></div>
                  <div className={`h-2 w-1/4 rounded-full ${
                    /[A-Z]/.test(password) ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}></div>
                  <div className={`h-2 w-1/4 rounded-full ${
                    /[a-z]/.test(password) ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}></div>
                  <div className={`h-2 w-1/4 rounded-full ${
                    /\d/.test(password) ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}></div>
                </div>
                <p className="text-xs text-slate-500">
                  Use 8+ characters with uppercase, lowercase, and numbers
                </p>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full py-4 text-lg font-semibold" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "🚀 Create Account"
              )}
            </Button>
          </form>
          
          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
