import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../App";

const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    if (!/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/.test(email)) {
      return M.toast({
        html: "invalid email",
        classes: "#f4511e deep-orange darken-1",
      });
    }
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#ffd600 yellow accent-4 " });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "signin succesfully",
            classes: "#33691e light-green darken-4",
          });
          history("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mycard ">
      <div className="card auth_card input-field">
        <h2>Image Thumbnail</h2>
        <h6>please enter your email and password</h6>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button
          className="btn #2196f3 blue"
          onClick={(e) => PostData(e.preventDefault())}
        >
          Login
        </button>
        <h5>
          <Link to="/signup"> Already have an account?</Link>{" "}
        </h5>
      </div>
    </div>
  );
};

export default Signin;
