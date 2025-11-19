import React, { useCallback } from "react";
import { Button, Input, RTE } from "../index";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, control, getValues, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    // EDIT MODE
    if (post) {
      const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const updatedPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (updatedPost) navigate(`/post/${updatedPost.$id}`);
      return;
    }

    // CREATE MODE
    const file = await appwriteService.uploadFile(data.image[0]);

    const newPost = await appwriteService.createPost({
      ...data,
      featuredImage: file.$id,
      userId: userData.$id,
    });

    if (newPost) navigate(`/post/${newPost.$id}`);
  };

  // Auto slug generator
  const slugTransform = useCallback((value) => {
    if (!value) return "";
    return value.trim().toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-");
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
          {post ? "Edit Post" : "Create New Post"}
        </h1>
        <p className="text-slate-600 leading-relaxed text-lg">
          {post ? "Update your blog post content and settings" : "Share your thoughts with the world"}
        </p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100/50 hover:shadow-2xl transition-shadow duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2"><span>📝</span><span>Post Details</span></h2>
            
            <div className="space-y-6">
              <Input 
                label="Title" 
                placeholder="Enter your post title..."
                {...register("title", { required: true })} 
              />

              <Input
                label="Slug"
                placeholder="auto-generated-from-title"
                {...register("slug", { required: true })}
                onInput={(e) => setValue("slug", slugTransform(e.target.value))}
              />
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100/50 hover:shadow-2xl transition-shadow duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2"><span>✍️</span><span>Content</span></h2>
            <RTE
              label="Write your post content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-100/50 hover:shadow-2xl transition-shadow duration-500">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2"><span>🖼️</span><span>Featured Image</span></h3>
            
            <Input
              label="Upload Image"
              type="file"
              accept="image/*"
              {...register("image", { required: !post })}
            />

            {post?.featuredImage && (
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Current Image:</p>
                <div className="relative group">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300"></div>
                </div>
              </div>
            )}
          </div>

          {/* Post Settings */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-100/50 hover:shadow-2xl transition-shadow duration-500">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2"><span>⚙️</span><span>Post Settings</span></h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select 
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm focus:shadow-md hover:bg-white"
                  {...register("status", { required: true })}
                >
                  <option value="active">✅ Active (Published)</option>
                  <option value="inactive">📝 Draft (Inactive)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-100/50 hover:shadow-2xl transition-shadow duration-500">
            <Button 
              type="submit" 
              bgColor={post ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"} 
              className="w-full py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
              {post ? "🔄 Update Post" : "🚀 Publish Post"}
            </Button>
            
            <p className="text-xs text-slate-500 text-center mt-3">
              {post ? "Changes will be saved immediately" : "Your post will be published instantly"}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
