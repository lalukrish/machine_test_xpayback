import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../App";
import Thumbnail from "./Thumbnail";
import "./style.css";
const Home = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      //iamge uploading

      fetch("http://localhost:5000/hostimage", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#ffd600 yellow accent-4 " });
          } else {
            M.toast({
              html: "created post successfully",
              classes: "#33691e light-green darken-4",
            });
            history("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  //image to cloudinary

  const PostDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "image-host");
    data.append("cloud_name", "dvjjzsilz");
    fetch("https://api.cloudinary.com/v1_1/dvjjzsilz/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 h-screeen w-full">
      <div
        className="w-full h-full"
        style={{
          backgroundColor: "powderblue",
          maxWidth: "1000px",
          margin: "0px auto",
        }}
      >
        <div
          className="inset-y-40 right bg-blue-500  hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded"
          style={{
            maxWidth: "90px",
            right: "0px",
          }}
        >
          <button
            onClick={(e) => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history("/");
            }}
          >
            Logout
          </button>
        </div>
        <div>
          <div>
            <h1 className="center font-bold">Free Image Hosting</h1>
            <div
              className="card input-field w-full h-full"
              style={{
                top: "70px",

                margin: "10px auto",
                maxWidth: "500px ",
                maxHeight: "500px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <h6>please enter the title and upload the file</h6>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="title"
              />
              <div className="file-field input-field w-full h-full">
                <div class="btn">
                  <span>file</span>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
              <button
                className="btn #2196f3 blue"
                onClick={() => PostDetails()}
              >
                upload
              </button>
            </div>
          </div>
        </div>

        <div className="top right-2 ">
          <button
            className="   my-10  py-3 bg-teal-500 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/20 text-white font-semibold rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              history("/thumbnail");
            }}
          >
            All thumbnail
          </button>
        </div>
        <div className="h-full center ">
          <button
            className="   my-10  py-3 bg-teal-500 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/20 text-white font-semibold rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              history("/myimages");
            }}
          >
            my images
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
