import React, { useState } from "react";
import M from "materialize-css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    if (!/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/.test(email)) {
      return M.toast({
        html: "invalid email",
        classes: "#f4511e deep-orange darken-1",
      });
    }
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#ffd600 yellow accent-4 " });
        } else {
          M.toast({
            html: data.message,
            classes: "#33691e light-green darken-4",
          });
          history("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mycard">
      <form className="card auth_card input-field">
        <h2>Image Thumbnail</h2>
        <h6>please enter all the fields</h6>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="username"
        />

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
          signup
        </button>
        <h5>
          <Link to="/"> Don't have an account?</Link>{" "}
        </h5>
      </form>
    </div>
  );
};

export default Signup;
