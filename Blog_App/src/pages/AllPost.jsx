import React, { useState, useEffect } from "react";
import { Container, Postcards } from "../components";
import appwriteService from "../appwrite/auth";
import DB from "../appwrite/conf";
import { Query } from "appwrite"; // ✅ import Query

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // ✅ get the logged-in user
        const user = await appwriteService.getCurrentUser();
        if (!user) {
          console.warn("⚠️ No logged-in user found");
          setLoading(false);
          return;
        }

        // ✅ fetch posts that belong only to this user
        const res = await DB.getPosts([
          Query.equal("userId", user.$id), // make sure your collection field is really "userId"
        ]);

        if (res && res.documents) {
          setPosts(res.documents);
        }
      } catch (error) {
        console.error("❌ Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div className="w-full py-6">
      <Container>
        {loading ? (
          <p className="text-center text-gray-500">Loading your posts...</p>
        ) : posts.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
            {posts.map((post) => (
              <div key={post.$id} className="relative overflow-hidden rounded-xl group">
                <Postcards {...post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            You haven’t posted anything yet.
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
