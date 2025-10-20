import "./App.css";
import Routing from "./components/routing";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

function App() {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isUserLoggedIn = () => {
    if (!token) {
      if (!window.location.pathname.startsWith("/reset-password")) {
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);
  return (
    <>
      {token && <NavBar />}
      <Routing />
    </>
  );
}

export default App;
