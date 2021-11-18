import React, { useEffect } from "react";
import Axios from "axios";
import { useAppContext } from "../context/appContext";
import Posts from "./Posts";
import NavBar from "./NavBar";
function Home() {
  const { setPosts } = useAppContext();
  useEffect(() => {
    const getPosts = async () => {
      const response = await Axios.get(
        " https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    };
    getPosts();
  }, [setPosts]);
  return (
    <div>
      <NavBar />
      <h1 className="text-center m-2">Daily today's posts</h1>
      <Posts />
    </div>
  );
}

export default Home;
