import React, { useEffect, useState } from "react";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContext } from "./context/appContext";

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("tokenLogIn")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <AppContext>
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
        </Switch>
      </Router>
    </AppContext>
  );
}

export default App;
