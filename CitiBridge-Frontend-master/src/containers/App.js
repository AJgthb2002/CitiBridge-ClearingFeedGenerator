import React from "react";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "../containers/App.css";
import Valid_Records from "../components/Valid_Records";
import Invalid_Records from "../components/Invalid_Records";
import Visualization from "../components/Visualization";

function App() {
  
  return (
    <div className="main__Container">
      <Sidebar></Sidebar>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home ></Home>}></Route>
          <Route
            exact
            path="/valid_records"
            element={<Valid_Records ></Valid_Records>}
          ></Route>
          <Route
            exact
            path="/invalid_records"
            element={<Invalid_Records></Invalid_Records>}
          ></Route>
          <Route
            exact
            path="/visualization"
            element={<Visualization></Visualization>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
