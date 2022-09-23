import React from "react";
import "../components/Home.css";
import Particles from "react-tsparticles";
import { BsFillFileEarmarkCheckFill, BsUpload } from "react-icons/bs";
import axios from "axios";

function Home(props) {

  const [fileName, setFileName] = React.useState("No File Chosen");
  const [file, setFile] = React.useState(null)
  let handleChange = (e) => {
    var files = e.target.files;
    setFile(e.target.files[0]);
    var filesArray = [].slice.call(files);
    filesArray.forEach((e) => {
      setFileName(e.name);
      console.log(e.name);
    });
  };
  const uploadFile = ()=> {
    let formData = new FormData();
    formData.append("file", file);
    axios.post('http://localhost:8080/upload',formData,
    ).then((response)=> {
      console.log("File Uploaded", response);
    })
  }

  return (
    <div
      className="home__main"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1 className="home__title">Clearing Feed Generation</h1>

      <input type="file" id="file" accept=".txt" onChange={(e) => handleChange(e)}></input>
      <label for="file" class="grow">
        <BsUpload
          size="18px"
          color="white"
          style={{ paddingRight: "8px" }}
        ></BsUpload>
        Choose a File
      </label>

      <p className="fileChosen">{fileName}</p>

      <button class="home__check__btn grow" type="submit" onSubmit={uploadFile()}>
        <BsFillFileEarmarkCheckFill
          size="20px"
          style={{ paddingRight: "8px" }}
        ></BsFillFileEarmarkCheckFill>
        Check
      </button>

      <img
        className="home__waveImage"
        src="https://newtemplate.net/demo/resume/template/side-menu-wave/images/wave.png"
        alt=""
      ></img>
      <Particles />
    </div>
  );
}

export default Home;
