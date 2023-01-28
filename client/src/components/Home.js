import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
const Home = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);

  //thumbail-api

  useEffect(() => {
    fetch("http://localhost:5000/thumbnails", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, []);

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
    <div style={{ maxWidth: "800px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <div
            className="card input-field"
            style={{
              margin: "10px auto",
              maxWidth: "500px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title"
            />
            <div className="file-field input-field">
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
            <button className="btn #2196f3 blue" onClick={() => PostDetails()}>
              upload
            </button>
          </div>

          <div>
            <img
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "80px",
                marginTop: "25px",
                margin: "20px 60px",
                justifyContent: "space-between",
              }}
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAUgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHCAL/xAAvEAABAwIEBAYBBAMAAAAAAAABAAIDBBEFBiExEhNBUQcUMmFxgZEiobHBI1Ji/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAaEQEBAQEBAQEAAAAAAAAAAAAAEQECITED/9oADAMBAAIRAxEAPwDjAargarjWL7DF1jjVrgVQ1XxGvsRqxKjhicClCIr6ER7JConLVOWp3ITkpFqAY1HkgIuQsq6LTZY+ueG/42nU+q3RZ6zI1zu1DRURc22bbErrYfZS44fZX20/svRHnQWwK6yn9lkI6Yk7KXHR9wrDPWKZTE9FdFJpssu2mA6K42lJ6KN5jC+W02Xyab2WdNL7L4NKToGqkaziLORSSyXIIFgR3OgWsnXU6lbpmiDlYRIdPU0a/K0tcf0+t854oiIsNN+hp79FOipLjZTqekuRoshFSbCy9WuGYxkVHbYKXHRuPRZeGiA6XUtlLpqLBZ3p0zGGjogNxdXPJXG1gswYGt2F1TkucpV8YjybW9FR1LbYLONozuR+VbqYeVBLI1vGWMLuHvYKVY5h4hysiZS0YcOYXGVzewAsP5P4WkqTiVfUYnWSVlW4OlkNzYWAHQAdgoy5bt1RFRVUHd6aAC1gp8dM0AE7K9DSEbBZCCm01F123XPEWFjR6Wq7yi7usgykHZSI6bpZZrTCS+Wp3RCpniidM8MjEjw0yO/1F9z7BTWU46Bcix/MTMbz5Qw4jE1mH4diJjjEXrI4wLkne5aD8aDuu5imAOu6lVjhSt3IJWveIUjqHJuKTRngJiEYI/6cG/2t15IGwXKfHXFWRUlDgjBKJZHipeRo0sHE0D311+gpuq42iaIsgiXRB6sip2dlJZAOyvRx+ykMiCVIssiHZXWx2OikNiCuCIIrynmqNuGZ1xSKMCMQ4g8su69v13Gq9O0NVSYlTNqqCphqYH7SQvDmn7C5/RZZwzGfGPMr62liq6aCkh44pow5jZXsZ+9mk/ZU3JGD0OGeJmaqbCafy1HTU1MzksLuEueOK+p+f3Qb4I1548bsVdXZzfRcrgZh0TYQTu8uHGT8fqH4XUvE/wAQqXK1FJQ4bJHNjMoLQ0Ov5YW9TvfsP6XnCpqJqqeSeplfNNI4ufJI4uc4nckncoLaoiICIiDMU+aMwU3D5fHcTYG7NFW+34vZbxlPxhxOhlZDmJhr6XYzRtDZmfwHfdvlcwRSK9RU3iHlGZjXNx+lbcA2k4mkfIIUxmd8rO2zFhn3UtC8o3RSLXofKOZ8Bp84ZxlfitJwTzQSxSGZvDK0R2PAb/qsdNFyTOecpsXzbW4zgk1bh0dQ1jLRzFj3hoABdw27XtrZami0ir3ue5znuLnON3OJuSe5XyiIgiIgIiICIiBdVVFVBRERAREQEREBERARUVUBERAREQEREBFREBERB//Z"
            />
          </div>
          <div>
            <h3
              style={{
                marginTop: "25px",
                marginLeft: "1px",
                marginRight: "200px",
                justifyContent: "space-between",
              }}
            >
              lallu
            </h3>
          </div>
        </div>
        <div className="gallery">
          {/* {data.map((item) => {
            return (
              <div>
                <img className="item1" src={item.photo} />
                <img
                  className="item2"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAUgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHCAL/xAAvEAABAwIEBAYBBAMAAAAAAAABAAIDBBEFBiExEhNBUQcUMmFxgZEiobHBI1Ji/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAaEQEBAQEBAQEAAAAAAAAAAAAAEQECITED/9oADAMBAAIRAxEAPwDjAargarjWL7DF1jjVrgVQ1XxGvsRqxKjhicClCIr6ER7JConLVOWp3ITkpFqAY1HkgIuQsq6LTZY+ueG/42nU+q3RZ6zI1zu1DRURc22bbErrYfZS44fZX20/svRHnQWwK6yn9lkI6Yk7KXHR9wrDPWKZTE9FdFJpssu2mA6K42lJ6KN5jC+W02Xyab2WdNL7L4NKToGqkaziLORSSyXIIFgR3OgWsnXU6lbpmiDlYRIdPU0a/K0tcf0+t854oiIsNN+hp79FOipLjZTqekuRoshFSbCy9WuGYxkVHbYKXHRuPRZeGiA6XUtlLpqLBZ3p0zGGjogNxdXPJXG1gswYGt2F1TkucpV8YjybW9FR1LbYLONozuR+VbqYeVBLI1vGWMLuHvYKVY5h4hysiZS0YcOYXGVzewAsP5P4WkqTiVfUYnWSVlW4OlkNzYWAHQAdgoy5bt1RFRVUHd6aAC1gp8dM0AE7K9DSEbBZCCm01F123XPEWFjR6Wq7yi7usgykHZSI6bpZZrTCS+Wp3RCpniidM8MjEjw0yO/1F9z7BTWU46Bcix/MTMbz5Qw4jE1mH4diJjjEXrI4wLkne5aD8aDuu5imAOu6lVjhSt3IJWveIUjqHJuKTRngJiEYI/6cG/2t15IGwXKfHXFWRUlDgjBKJZHipeRo0sHE0D311+gpuq42iaIsgiXRB6sip2dlJZAOyvRx+ykMiCVIssiHZXWx2OikNiCuCIIrynmqNuGZ1xSKMCMQ4g8su69v13Gq9O0NVSYlTNqqCphqYH7SQvDmn7C5/RZZwzGfGPMr62liq6aCkh44pow5jZXsZ+9mk/ZU3JGD0OGeJmaqbCafy1HTU1MzksLuEueOK+p+f3Qb4I1548bsVdXZzfRcrgZh0TYQTu8uHGT8fqH4XUvE/wAQqXK1FJQ4bJHNjMoLQ0Ov5YW9TvfsP6XnCpqJqqeSeplfNNI4ufJI4uc4nckncoLaoiICIiDMU+aMwU3D5fHcTYG7NFW+34vZbxlPxhxOhlZDmJhr6XYzRtDZmfwHfdvlcwRSK9RU3iHlGZjXNx+lbcA2k4mkfIIUxmd8rO2zFhn3UtC8o3RSLXofKOZ8Bp84ZxlfitJwTzQSxSGZvDK0R2PAb/qsdNFyTOecpsXzbW4zgk1bh0dQ1jLRzFj3hoABdw27XtrZami0ir3ue5znuLnON3OJuSe5XyiIgiIgIiICIiBdVVFVBRERAREQEREBERARUVUBERAREQEREBFREBERB//Z"
                />{" "}
                <h6>hi</h6>
                <img
                  className="item3"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAUgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHCAL/xAAvEAABAwIEBAYBBAMAAAAAAAABAAIDBBEFBiExEhNBUQcUMmFxgZEiobHBI1Ji/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAaEQEBAQEBAQEAAAAAAAAAAAAAEQECITED/9oADAMBAAIRAxEAPwDjAargarjWL7DF1jjVrgVQ1XxGvsRqxKjhicClCIr6ER7JConLVOWp3ITkpFqAY1HkgIuQsq6LTZY+ueG/42nU+q3RZ6zI1zu1DRURc22bbErrYfZS44fZX20/svRHnQWwK6yn9lkI6Yk7KXHR9wrDPWKZTE9FdFJpssu2mA6K42lJ6KN5jC+W02Xyab2WdNL7L4NKToGqkaziLORSSyXIIFgR3OgWsnXU6lbpmiDlYRIdPU0a/K0tcf0+t854oiIsNN+hp79FOipLjZTqekuRoshFSbCy9WuGYxkVHbYKXHRuPRZeGiA6XUtlLpqLBZ3p0zGGjogNxdXPJXG1gswYGt2F1TkucpV8YjybW9FR1LbYLONozuR+VbqYeVBLI1vGWMLuHvYKVY5h4hysiZS0YcOYXGVzewAsP5P4WkqTiVfUYnWSVlW4OlkNzYWAHQAdgoy5bt1RFRVUHd6aAC1gp8dM0AE7K9DSEbBZCCm01F123XPEWFjR6Wq7yi7usgykHZSI6bpZZrTCS+Wp3RCpniidM8MjEjw0yO/1F9z7BTWU46Bcix/MTMbz5Qw4jE1mH4diJjjEXrI4wLkne5aD8aDuu5imAOu6lVjhSt3IJWveIUjqHJuKTRngJiEYI/6cG/2t15IGwXKfHXFWRUlDgjBKJZHipeRo0sHE0D311+gpuq42iaIsgiXRB6sip2dlJZAOyvRx+ykMiCVIssiHZXWx2OikNiCuCIIrynmqNuGZ1xSKMCMQ4g8su69v13Gq9O0NVSYlTNqqCphqYH7SQvDmn7C5/RZZwzGfGPMr62liq6aCkh44pow5jZXsZ+9mk/ZU3JGD0OGeJmaqbCafy1HTU1MzksLuEueOK+p+f3Qb4I1548bsVdXZzfRcrgZh0TYQTu8uHGT8fqH4XUvE/wAQqXK1FJQ4bJHNjMoLQ0Ov5YW9TvfsP6XnCpqJqqeSeplfNNI4ufJI4uc4nckncoLaoiICIiDMU+aMwU3D5fHcTYG7NFW+34vZbxlPxhxOhlZDmJhr6XYzRtDZmfwHfdvlcwRSK9RU3iHlGZjXNx+lbcA2k4mkfIIUxmd8rO2zFhn3UtC8o3RSLXofKOZ8Bp84ZxlfitJwTzQSxSGZvDK0R2PAb/qsdNFyTOecpsXzbW4zgk1bh0dQ1jLRzFj3hoABdw27XtrZami0ir3ue5znuLnON3OJuSe5XyiIgiIgIiICIiBdVVFVBRERAREQEREBERARUVUBERAREQEREBFREBERB//Z"
                />
                <img
                  className="item4"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAUgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHCAL/xAAvEAABAwIEBAYBBAMAAAAAAAABAAIDBBEFBiExEhNBUQcUMmFxgZEiobHBI1Ji/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAaEQEBAQEBAQEAAAAAAAAAAAAAEQECITED/9oADAMBAAIRAxEAPwDjAargarjWL7DF1jjVrgVQ1XxGvsRqxKjhicClCIr6ER7JConLVOWp3ITkpFqAY1HkgIuQsq6LTZY+ueG/42nU+q3RZ6zI1zu1DRURc22bbErrYfZS44fZX20/svRHnQWwK6yn9lkI6Yk7KXHR9wrDPWKZTE9FdFJpssu2mA6K42lJ6KN5jC+W02Xyab2WdNL7L4NKToGqkaziLORSSyXIIFgR3OgWsnXU6lbpmiDlYRIdPU0a/K0tcf0+t854oiIsNN+hp79FOipLjZTqekuRoshFSbCy9WuGYxkVHbYKXHRuPRZeGiA6XUtlLpqLBZ3p0zGGjogNxdXPJXG1gswYGt2F1TkucpV8YjybW9FR1LbYLONozuR+VbqYeVBLI1vGWMLuHvYKVY5h4hysiZS0YcOYXGVzewAsP5P4WkqTiVfUYnWSVlW4OlkNzYWAHQAdgoy5bt1RFRVUHd6aAC1gp8dM0AE7K9DSEbBZCCm01F123XPEWFjR6Wq7yi7usgykHZSI6bpZZrTCS+Wp3RCpniidM8MjEjw0yO/1F9z7BTWU46Bcix/MTMbz5Qw4jE1mH4diJjjEXrI4wLkne5aD8aDuu5imAOu6lVjhSt3IJWveIUjqHJuKTRngJiEYI/6cG/2t15IGwXKfHXFWRUlDgjBKJZHipeRo0sHE0D311+gpuq42iaIsgiXRB6sip2dlJZAOyvRx+ykMiCVIssiHZXWx2OikNiCuCIIrynmqNuGZ1xSKMCMQ4g8su69v13Gq9O0NVSYlTNqqCphqYH7SQvDmn7C5/RZZwzGfGPMr62liq6aCkh44pow5jZXsZ+9mk/ZU3JGD0OGeJmaqbCafy1HTU1MzksLuEueOK+p+f3Qb4I1548bsVdXZzfRcrgZh0TYQTu8uHGT8fqH4XUvE/wAQqXK1FJQ4bJHNjMoLQ0Ov5YW9TvfsP6XnCpqJqqeSeplfNNI4ufJI4uc4nckncoLaoiICIiDMU+aMwU3D5fHcTYG7NFW+34vZbxlPxhxOhlZDmJhr6XYzRtDZmfwHfdvlcwRSK9RU3iHlGZjXNx+lbcA2k4mkfIIUxmd8rO2zFhn3UtC8o3RSLXofKOZ8Bp84ZxlfitJwTzQSxSGZvDK0R2PAb/qsdNFyTOecpsXzbW4zgk1bh0dQ1jLRzFj3hoABdw27XtrZami0ir3ue5znuLnON3OJuSe5XyiIgiIgIiICIiBdVVFVBRERAREQEREBERARUVUBERAREQEREBFREBERB//Z"
                />
                <img
                  className="item5"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAUgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHCAL/xAAvEAABAwIEBAYBBAMAAAAAAAABAAIDBBEFBiExEhNBUQcUMmFxgZEiobHBI1Ji/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAaEQEBAQEBAQEAAAAAAAAAAAAAEQECITED/9oADAMBAAIRAxEAPwDjAargarjWL7DF1jjVrgVQ1XxGvsRqxKjhicClCIr6ER7JConLVOWp3ITkpFqAY1HkgIuQsq6LTZY+ueG/42nU+q3RZ6zI1zu1DRURc22bbErrYfZS44fZX20/svRHnQWwK6yn9lkI6Yk7KXHR9wrDPWKZTE9FdFJpssu2mA6K42lJ6KN5jC+W02Xyab2WdNL7L4NKToGqkaziLORSSyXIIFgR3OgWsnXU6lbpmiDlYRIdPU0a/K0tcf0+t854oiIsNN+hp79FOipLjZTqekuRoshFSbCy9WuGYxkVHbYKXHRuPRZeGiA6XUtlLpqLBZ3p0zGGjogNxdXPJXG1gswYGt2F1TkucpV8YjybW9FR1LbYLONozuR+VbqYeVBLI1vGWMLuHvYKVY5h4hysiZS0YcOYXGVzewAsP5P4WkqTiVfUYnWSVlW4OlkNzYWAHQAdgoy5bt1RFRVUHd6aAC1gp8dM0AE7K9DSEbBZCCm01F123XPEWFjR6Wq7yi7usgykHZSI6bpZZrTCS+Wp3RCpniidM8MjEjw0yO/1F9z7BTWU46Bcix/MTMbz5Qw4jE1mH4diJjjEXrI4wLkne5aD8aDuu5imAOu6lVjhSt3IJWveIUjqHJuKTRngJiEYI/6cG/2t15IGwXKfHXFWRUlDgjBKJZHipeRo0sHE0D311+gpuq42iaIsgiXRB6sip2dlJZAOyvRx+ykMiCVIssiHZXWx2OikNiCuCIIrynmqNuGZ1xSKMCMQ4g8su69v13Gq9O0NVSYlTNqqCphqYH7SQvDmn7C5/RZZwzGfGPMr62liq6aCkh44pow5jZXsZ+9mk/ZU3JGD0OGeJmaqbCafy1HTU1MzksLuEueOK+p+f3Qb4I1548bsVdXZzfRcrgZh0TYQTu8uHGT8fqH4XUvE/wAQqXK1FJQ4bJHNjMoLQ0Ov5YW9TvfsP6XnCpqJqqeSeplfNNI4ufJI4uc4nckncoLaoiICIiDMU+aMwU3D5fHcTYG7NFW+34vZbxlPxhxOhlZDmJhr6XYzRtDZmfwHfdvlcwRSK9RU3iHlGZjXNx+lbcA2k4mkfIIUxmd8rO2zFhn3UtC8o3RSLXofKOZ8Bp84ZxlfitJwTzQSxSGZvDK0R2PAb/qsdNFyTOecpsXzbW4zgk1bh0dQ1jLRzFj3hoABdw27XtrZami0ir3ue5znuLnON3OJuSe5XyiIgiIgIiICIiBdVVFVBRERAREQEREBERARUVUBERAREQEREBFREBERB//Z"
                />
                <img
                  className="item6"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAUgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHCAL/xAAvEAABAwIEBAYBBAMAAAAAAAABAAIDBBEFBiExEhNBUQcUMmFxgZEiobHBI1Ji/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAaEQEBAQEBAQEAAAAAAAAAAAAAEQECITED/9oADAMBAAIRAxEAPwDjAargarjWL7DF1jjVrgVQ1XxGvsRqxKjhicClCIr6ER7JConLVOWp3ITkpFqAY1HkgIuQsq6LTZY+ueG/42nU+q3RZ6zI1zu1DRURc22bbErrYfZS44fZX20/svRHnQWwK6yn9lkI6Yk7KXHR9wrDPWKZTE9FdFJpssu2mA6K42lJ6KN5jC+W02Xyab2WdNL7L4NKToGqkaziLORSSyXIIFgR3OgWsnXU6lbpmiDlYRIdPU0a/K0tcf0+t854oiIsNN+hp79FOipLjZTqekuRoshFSbCy9WuGYxkVHbYKXHRuPRZeGiA6XUtlLpqLBZ3p0zGGjogNxdXPJXG1gswYGt2F1TkucpV8YjybW9FR1LbYLONozuR+VbqYeVBLI1vGWMLuHvYKVY5h4hysiZS0YcOYXGVzewAsP5P4WkqTiVfUYnWSVlW4OlkNzYWAHQAdgoy5bt1RFRVUHd6aAC1gp8dM0AE7K9DSEbBZCCm01F123XPEWFjR6Wq7yi7usgykHZSI6bpZZrTCS+Wp3RCpniidM8MjEjw0yO/1F9z7BTWU46Bcix/MTMbz5Qw4jE1mH4diJjjEXrI4wLkne5aD8aDuu5imAOu6lVjhSt3IJWveIUjqHJuKTRngJiEYI/6cG/2t15IGwXKfHXFWRUlDgjBKJZHipeRo0sHE0D311+gpuq42iaIsgiXRB6sip2dlJZAOyvRx+ykMiCVIssiHZXWx2OikNiCuCIIrynmqNuGZ1xSKMCMQ4g8su69v13Gq9O0NVSYlTNqqCphqYH7SQvDmn7C5/RZZwzGfGPMr62liq6aCkh44pow5jZXsZ+9mk/ZU3JGD0OGeJmaqbCafy1HTU1MzksLuEueOK+p+f3Qb4I1548bsVdXZzfRcrgZh0TYQTu8uHGT8fqH4XUvE/wAQqXK1FJQ4bJHNjMoLQ0Ov5YW9TvfsP6XnCpqJqqeSeplfNNI4ufJI4uc4nckncoLaoiICIiDMU+aMwU3D5fHcTYG7NFW+34vZbxlPxhxOhlZDmJhr6XYzRtDZmfwHfdvlcwRSK9RU3iHlGZjXNx+lbcA2k4mkfIIUxmd8rO2zFhn3UtC8o3RSLXofKOZ8Bp84ZxlfitJwTzQSxSGZvDK0R2PAb/qsdNFyTOecpsXzbW4zgk1bh0dQ1jLRzFj3hoABdw27XtrZami0ir3ue5znuLnON3OJuSe5XyiIgiIgIiICIiBdVVFVBRERAREQEREBERARUVUBERAREQEREBFREBERB//Z"
                />
                <img
                  className="item7"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAUgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHCAL/xAAvEAABAwIEBAYBBAMAAAAAAAABAAIDBBEFBiExEhNBUQcUMmFxgZEiobHBI1Ji/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAaEQEBAQEBAQEAAAAAAAAAAAAAEQECITED/9oADAMBAAIRAxEAPwDjAargarjWL7DF1jjVrgVQ1XxGvsRqxKjhicClCIr6ER7JConLVOWp3ITkpFqAY1HkgIuQsq6LTZY+ueG/42nU+q3RZ6zI1zu1DRURc22bbErrYfZS44fZX20/svRHnQWwK6yn9lkI6Yk7KXHR9wrDPWKZTE9FdFJpssu2mA6K42lJ6KN5jC+W02Xyab2WdNL7L4NKToGqkaziLORSSyXIIFgR3OgWsnXU6lbpmiDlYRIdPU0a/K0tcf0+t854oiIsNN+hp79FOipLjZTqekuRoshFSbCy9WuGYxkVHbYKXHRuPRZeGiA6XUtlLpqLBZ3p0zGGjogNxdXPJXG1gswYGt2F1TkucpV8YjybW9FR1LbYLONozuR+VbqYeVBLI1vGWMLuHvYKVY5h4hysiZS0YcOYXGVzewAsP5P4WkqTiVfUYnWSVlW4OlkNzYWAHQAdgoy5bt1RFRVUHd6aAC1gp8dM0AE7K9DSEbBZCCm01F123XPEWFjR6Wq7yi7usgykHZSI6bpZZrTCS+Wp3RCpniidM8MjEjw0yO/1F9z7BTWU46Bcix/MTMbz5Qw4jE1mH4diJjjEXrI4wLkne5aD8aDuu5imAOu6lVjhSt3IJWveIUjqHJuKTRngJiEYI/6cG/2t15IGwXKfHXFWRUlDgjBKJZHipeRo0sHE0D311+gpuq42iaIsgiXRB6sip2dlJZAOyvRx+ykMiCVIssiHZXWx2OikNiCuCIIrynmqNuGZ1xSKMCMQ4g8su69v13Gq9O0NVSYlTNqqCphqYH7SQvDmn7C5/RZZwzGfGPMr62liq6aCkh44pow5jZXsZ+9mk/ZU3JGD0OGeJmaqbCafy1HTU1MzksLuEueOK+p+f3Qb4I1548bsVdXZzfRcrgZh0TYQTu8uHGT8fqH4XUvE/wAQqXK1FJQ4bJHNjMoLQ0Ov5YW9TvfsP6XnCpqJqqeSeplfNNI4ufJI4uc4nckncoLaoiICIiDMU+aMwU3D5fHcTYG7NFW+34vZbxlPxhxOhlZDmJhr6XYzRtDZmfwHfdvlcwRSK9RU3iHlGZjXNx+lbcA2k4mkfIIUxmd8rO2zFhn3UtC8o3RSLXofKOZ8Bp84ZxlfitJwTzQSxSGZvDK0R2PAb/qsdNFyTOecpsXzbW4zgk1bh0dQ1jLRzFj3hoABdw27XtrZami0ir3ue5znuLnON3OJuSe5XyiIgiIgIiICIiBdVVFVBRERAREQEREBERARUVUBERAREQEREBFREBERB//Z"
                />
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
