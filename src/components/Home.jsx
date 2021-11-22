import React from "react";

import { useAppContext } from "../context/appContext";
import Posts from "./Posts";
import NavBar from "./NavBar";
function Home() {
  const { loading } = useAppContext();

  return (
    <div>
      {loading === true ? (
        <>
          <NavBar />
          <h1 className="text-center m-2">Daily today's posts</h1>
          <Posts />
        </>
      ) : (
        <div className="d-flex justify-content-center border border-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
