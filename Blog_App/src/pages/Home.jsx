import React, { useEffect, useState } from "react";
import DBService from "../appwrite/conf";
import { Container, Postcards } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status); // check if logged in
  const navigate = useNavigate();

  useEffect(() => {
    DBService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read the Posts:
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const handlePostClick = (slug) => {
    if (authStatus) {
      navigate(`/post/${slug}`);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="w-full py-6">
      <Container>
        {/* Masonry-like grid layout */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="relative overflow-hidden rounded-xl group cursor-pointer"
              onClick={() => handlePostClick(post.$id)} // 👈 redirect logic
            >
              <Postcards {...post} />

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <p className="text-white font-semibold">
                  {authStatus ? "View Post" : "Signup to Read"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
