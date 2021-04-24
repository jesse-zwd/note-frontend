import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import Router from "./Router";
import { applyTheme } from "./utils";

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  const { data: user }= useSelector((state) => state.user);
  
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return <>{user.access ? <Router /> : <Auth />}</>;
};

export default App;
