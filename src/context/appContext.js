import { useState, createContext, useContext } from "react";
const appContext = createContext();

export const useAppContext = () => useContext(appContext);

export const AppContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const IsLogIn = (token) => {
    localStorage.setItem("tokenLogIn", token);
  };

  return (
    <appContext.Provider value={{ IsLogIn, setPosts, posts }}>
      {children}
    </appContext.Provider>
  );
};
