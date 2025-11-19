import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from "../index";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        <Container>
          {/* Hero Section */}
          <div className="text-center py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
                Welcome to BlogSpace
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
                Discover amazing stories, insights, and ideas from our community of writers.
              </p>
              
              {!authStatus ? (
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to explore?</h2>
                    <p className="text-slate-600 mb-6">Join our community to read and share amazing content.</p>
                    <div className="space-y-3">
                      <a href="/login" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                        🔐 Sign In
                      </a>
                      <a href="/signup" className="block w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl border-2 border-slate-200 hover:border-indigo-300 transition-all duration-200">
                        📝 Create Account
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">No posts yet!</h2>
                  <p className="text-slate-600 mb-6">Be the first to share your story with the community.</p>
                  <a href="/add-post" className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                    ✍️ Write Your First Post
                  </a>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Container>
        {/* Hero Section */}
        <div className="text-center py-16 px-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Stories
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover fresh perspectives and engaging content from our community
          </p>
        </div>
        
        {/* Posts Grid */}
        <div className="pb-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
