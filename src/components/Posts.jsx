import React from "react";
import { useAppContext } from "../context/appContext";
function Posts() {
  const { posts } = useAppContext();

  return (
    <>
      {posts.map((data) => {
        return (
          <div className="conatiner border border-dark m-1" key={data.id}>
            <h1 className="text-center">{data.title}</h1>
            <div className="conatiner text-center">
              <button className="btn btn-outline-success"> Detail </button>
              <button className="btn btn-outline-info m-2"> Modify </button>
              <button className="btn btn-outline-danger"> Delete </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Posts;
