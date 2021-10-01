import { useState } from "react";
import { Route, Switch } from "react-router-dom";

import General from "./pages/General/General";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";

import "./App.scss";

const App = () => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  return (
    <div className="main_container">
      <Switch>
        <Route path="/register">
          <Registration isLogin={isLogin} setIsLogin={setIsLogin} />
        </Route>
        <Route path="/login">
          <Login isLogin={isLogin} setIsLogin={setIsLogin} />
        </Route>
        <Route path="/general">
          <General isLogin={isLogin} setIsLogin={setIsLogin} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
