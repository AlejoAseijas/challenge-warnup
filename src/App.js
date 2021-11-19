import React, { useEffect, useState } from "react";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import DetailPost from "./components/DetailPost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import { useAppContext } from "../src/context/appContext";
import Axios from "axios";
function App() {
  const { setPosts, setLoading } = useAppContext();

  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const getListPosts = async () => {
      const response = await Axios.get(
        " https://jsonplaceholder.typicode.com/posts?_start=5&_limit=5"
      );
      setPosts(response.data);
      setLoading(true);
    };
    getListPosts();
    if (localStorage.getItem("tokenLogIn")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <Router>
      <Switch>
        {auth === false ? (
          <Route exact path="/">
            <LogIn />
          </Route>
        ) : (
          <Route exact path="/">
            <Home />
          </Route>
        )}
        <Route
          exact
          path="/detail/post/:idPost"
          component={auth === true ? DetailPost : LogIn}
        ></Route>
        <Route
          exact
          path="/new-post/"
          component={auth === true ? CreatePost : LogIn}
        ></Route>
        <Route
          exact
          path="/edit/post/:idPost"
          component={auth === true ? CreatePost : LogIn}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
