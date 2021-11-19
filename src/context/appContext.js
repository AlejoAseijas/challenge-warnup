import Axios from "axios";
import { useState, createContext, useContext } from "react";
const appContext = createContext();

export const useAppContext = () => useContext(appContext);

export const AppContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const IsLogIn = (token) => {
    localStorage.setItem("tokenLogIn", token);
  };

  const postToDetail = (id) => {
    // eslint-disable-next-line eqeqeq
    let postDetail = posts.find((data) => data.id == id); //Not use ===. Because return undifined.
    return postDetail;
  };

  const createNewPost = async (data) => {
    let id = parseInt(data.userId);
    const res = await Axios.post(
      "https://httpbin.org/post",
      {
        title: data.titlePost,
        body: data.bodyPost,
        userId: id,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    let dataPost = JSON.parse(res.data.data);
    dataPost.id = dataPost.userId;
    setPosts([...posts, dataPost]);
    alert("Post Creado");
  };

  const deletePost = async (id) => {
    let response = await Axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (response.status === 200) {
      const newDataPost = posts.filter((postToDelete) => postToDelete.id != id);
      setPosts(newDataPost);
      return window.location.reload();
    } else {
      alert("error to delete");
    }
  };

  return (
    <appContext.Provider
      value={{
        IsLogIn,
        setPosts,
        posts,
        setLoading,
        loading,
        createNewPost,
        postToDetail,
        deletePost,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
