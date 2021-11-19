import React from "react";
import NavBar from "./NavBar";
import { useAppContext } from "../context/appContext";

function DetailPost(id) {
  const { postToDetail, deletePost } = useAppContext();
  const idPost = id.match.params.idPost;
  const data = postToDetail(idPost);

  return (
    <>
      <NavBar />
      <h1 className="text-center m-1">Detail Post</h1>
      <div className="conatiner border border-dark m-1 p-2" key={data.id}>
        <h1 className="text-center">{data.title}</h1>
        <p>{data.body}</p>
      </div>
    </>
  );
}

export default DetailPost;
