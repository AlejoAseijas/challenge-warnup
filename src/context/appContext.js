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
      "https://jsonplaceholder.typicode.com/posts",
      JSON.stringify({
        title: data.titlePost,
        body: data.bodyPost,
        userId: id,
      }),
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    setPosts([...posts, res.data]);
    alert("Post Creado");
  };

  const editPost = async (data, idPost) => {
    let userId = parseInt(data.userId);
    const res = await Axios.put(
      `https://jsonplaceholder.typicode.com/posts/${idPost}`,
      JSON.stringify({
        title: data.titlePost,
        body: data.bodyPost,
        userId: userId,
      }),
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    if (res.status === 200) {
      const newPostsEdits = posts.find((data) => data.id == idPost);
      newPostsEdits.title = res.data.title;
      newPostsEdits.body = res.data.body;
      const newSave = posts.filter((data) => {
        return data.id != idPost;
      });
      newSave.push(newPostsEdits);
      setPosts(newSave);
      alert("Post editado");
    } else {
      alert("error");
    }
  };

  const deletePost = async (id) => {
    let response = await Axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (response.status === 200) {
      const newDataPost = posts.filter((postToDelete) => postToDelete.id != id);
      setPosts(newDataPost);
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
        editPost,
        deletePost,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
