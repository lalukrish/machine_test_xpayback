import React, { useState } from "react";
import M from "materialize-css";
import { Link, useNavigate } from "react-router-dom";
import Logimg2 from "../assets/Logimg2.webp";

const Signup = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({
        html: "invalid email or not completed",
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
    <div>
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screeen w-full">
          <div className=" ">
            <img className="w-full h-full object-cover" src={Logimg2} alt="" />
          </div>

          <div className="bg-gray-900 flex flex-col justify-center">
            <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
              <h2 className="text-4x1 text-yellow-400 font-bold text-center">
                SIGN UP
              </h2>
              <div className="  flex flex-col text-gray-700 py-2">
                <label className=" text-white font-bold text-left">
                  User Name
                </label>
                <input
                  className="text-black w-full my-5 py-3 white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/20 text-white font-semibold rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>
              <div className="  flex flex-col text-gray-700 py-2">
                <label className=" text-white font-bold text-left">Email</label>
                <input
                  className="text-black w-full my-5 py-3 white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/20 text-white font-semibold rounded-lg"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
              </div>
              <div className="flex flex-col text-gray-600 py-2">
                <label className=" text-white font-bold text-left">
                  Password
                </label>
                <input
                  className="text-black w-full my-5 py-3 white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/20 text-white font-semibold rounded-lg"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>

              <button
                className="w-full my-5 py-3 bg-teal-500 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/20 text-white font-semibold rounded-lg"
                onClick={(e) => PostData(e.preventDefault())}
              >
                Sign Up
              </button>
              <h5 className="text-center">
                <Link to="/"> Already have an account?</Link>{" "}
              </h5>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
