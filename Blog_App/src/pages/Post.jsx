import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import img from "../assets/react-logo.svg";

export default function Post() {
  const [post, setPost] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deltePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <article className="py-12 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Featured Image */}
          <div className="relative group">
            <img
              src={
                post.featuredImage
                  ? appwriteService.previewfile(post.featuredImage)
                  : img
              }
              alt={post.title}
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Edit/Delete Buttons (only author can see) */}
            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="p-8 lg:p-12">
            {/* Blog Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-snug tracking-tight">
              {post.title}
            </h1>

            {/* SEO-friendly meta info */}
            <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
              <span>✍️ {userData?.name || "Anonymous"}</span>
              <span>•</span>
              <time dateTime={post.$createdAt}>
                {new Date(post.$createdAt).toLocaleDateString()}
              </time>
            </div>

            {/* Main Blog Content */}
            <div className="prose prose-lg prose-gray max-w-none leading-relaxed">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </article>
  ) : null;
}
