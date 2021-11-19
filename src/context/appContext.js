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

  return (
    <appContext.Provider
      value={{
        IsLogIn,
        setPosts,
        posts,
        setLoading,
        loading,
        postToDetail,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
