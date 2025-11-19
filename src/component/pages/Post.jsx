import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        post?.featuredImage && appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6 shadow-lg"></div>
          <p className="text-slate-700 font-semibold text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Container>
        <article className="max-w-5xl mx-auto">
          {/* Back Button */}
          <div className="pt-8 pb-4 px-4 sm:px-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center space-x-3 px-4 py-2 text-slate-600 hover:text-indigo-600 hover:bg-white/60 rounded-xl transition-all duration-300 group backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Back to posts</span>
            </button>
          </div>

          {/* Featured Image */}
          {post?.featuredImage && (
            <div className="px-4 sm:px-6 mb-10">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </div>
          )}

          {/* Post Header */}
          <header className="px-4 sm:px-6 mb-10">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/30 relative hover:shadow-3xl transition-shadow duration-500">
              {/* Author Controls */}
              {isAuthor && (
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex flex-col sm:flex-row gap-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      ✏️ Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    🗑️ Delete
                  </Button>
                </div>
              )}
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6 pr-4 sm:pr-24">
                {post.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-slate-600">
                <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-emerald-700">Published</span>
                </div>
                <div className="w-1 h-1 bg-slate-400 rounded-full hidden sm:block"></div>
                <span className="text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">
                  {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </header>

          {/* Post Content */}
          <main className="px-4 sm:px-6 pb-24">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-white/30 hover:shadow-3xl transition-shadow duration-500">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg prose-a:text-indigo-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-strong:font-bold prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-semibold prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 prose-blockquote:rounded-r-xl prose-blockquote:shadow-sm">
                {parse(post.content)}
              </div>
            </div>
          </main>
        </article>
      </Container>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-3xl border border-white/20 animate-in zoom-in-95 duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Delete Post?</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">This action cannot be undone. The post will be permanently deleted.</p>
              <div className="flex gap-4">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  onClick={deletePost}
                  className="flex-1 hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default Post;
