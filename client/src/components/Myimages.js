import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const Myimages = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/myimages", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.myimages);
      });
  }, []);
  return (
    <div className="home">
      <button
        className="btn #2196f3 blue"
        onClick={(e) => {
          e.preventDefault();
          history("/home");
        }}
      >
        Host New Image
      </button>
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <div className="card-images">
              <img src={item.photo} alt="no internet" />
            </div>
            <div className="card-content">
              <h4>{item.title}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Myimages;
