import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <article className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden border border-slate-100/50 group-hover:border-indigo-200/50">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          {featuredImage ? (
            <>
              <img
                src={appwriteService.getFilePreview(featuredImage)}
                alt={title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Glass Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Read More Badge */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <span className="bg-white/95 backdrop-blur-md text-indigo-600 px-4 py-2 rounded-full text-sm font-bold shadow-xl border border-white/20">
                  Read More →
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-indigo-600 text-sm font-medium">No Image</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 bg-gradient-to-b from-white/80 to-white/95 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors duration-500 line-clamp-2 mb-3">
            {title}
          </h2>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-emerald-50/80 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-700 font-semibold">Published</span>
            </div>
            <div className="text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500 bg-indigo-50/80 p-2 rounded-full group-hover:bg-indigo-100/80">
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
