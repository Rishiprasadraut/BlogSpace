import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../index";
import appwriteService from "../../appwrite/config";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    appwriteService.getPosts().then((result) => {
      if (result) {
        setPosts(result.documents);
      }
      setLoading(false);
    });
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading all posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50">
      <Container>
        {/* Header Section */}
        <div className="py-16 px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              All Posts
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Explore our complete collection of articles, stories, and insights
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition-all duration-200"
              />
            </div>
          </div>
          
          {/* Stats */}
          {/* <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20">
              <span className="text-slate-600 font-medium">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
              </span>
            </div>
          </div> */}
        </div>
        
        {/* Posts Grid */}
        <div className="pb-20 px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.$id}
                  $id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.881-6.077 2.33l-.853-.853A9.967 9.967 0 0112 13c3.273 0 6.267 1.572 8.077 4.077l-.853.853A7.962 7.962 0 0015 15.291V16.5A1.5 1.5 0 0113.5 18h-3A1.5 1.5 0 019 16.5v-1.209z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {searchTerm ? 'No posts found' : 'No posts available'}
                </h3>
                <p className="text-slate-600">
                  {searchTerm 
                    ? `No posts match "${searchTerm}". Try a different search term.`
                    : 'Be the first to create a post and share your story!'
                  }
                </p>
                {!searchTerm && (
                  <a 
                    href="/add-post" 
                    className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    ✍️ Create First Post
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
