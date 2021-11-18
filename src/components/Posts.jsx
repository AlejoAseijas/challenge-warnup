import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
function Posts() {
  const { posts, isNewPost, newPost } = useAppContext();

  return (
    <>
      {posts.map((data) => {
        return (
          <div className="conatiner border border-dark m-1 p-2" key={data.id}>
            <h1 className="text-center">{data.title}</h1>
            <div className="conatiner text-center">
              <Link to={`/detail/post/${data.id}`}>
                <button className="btn btn-outline-success">Detail</button>
              </Link>
              <button className="btn btn-outline-info m-2"> Modify </button>
              <button className="btn btn-outline-danger"> Delete </button>
            </div>
          </div>
        );
      })}
      {isNewPost === true ? (
        <>
          <h1 className="text-center m-1">Recent posts</h1>
          <div
            className="conatiner border border-dark m-1 p-2"
            key={newPost.id}
          >
            <h1 className="text-center">{newPost.title}</h1>
            <p>{newPost.body}</p>
            <div className="conatiner text-center">
              <button className="btn btn-outline-info m-1"> Modify </button>
              <button className="btn btn-outline-danger"> Delete </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Posts;
