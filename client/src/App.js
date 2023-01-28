import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { reducer, initialState } from "./reducer/userReducer";
import Thumbnail from "./components/Thumbnail";

export const UserContext = createContext();

const Routing = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(typeof user, user);
    if (user) {
      //  dispatch({ type: "USER", payload: user });
      history("/home");
    } else {
      history("/");
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Signin />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/thumbnail" element={<Thumbnail />}></Route>
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div style={{ backgroundColor: "#FF0000" }}>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
