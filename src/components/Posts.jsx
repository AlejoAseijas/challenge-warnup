import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
function Posts() {
  const { posts, deletePost } = useAppContext();

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
              <Link to={`/edit/post/${data.id}`}>
                <button className="btn btn-outline-info m-2">Modify</button>
              </Link>
              <button
                className="btn btn-outline-danger"
                data-id={data.id}
                onClick={(e) => {
                  deletePost(e.target.dataset.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Posts;
