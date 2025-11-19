import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../index";
import appwriteService from "../../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading post for editing...</p>
        </div>
      </div>
    );
  }
  
  return post ? (
    <div className="min-h-screen bg-gradient-to from-slate-50 to-indigo-50">
      <PostForm post={post} />
    </div>
  ) : null;
}

export default EditPost;
