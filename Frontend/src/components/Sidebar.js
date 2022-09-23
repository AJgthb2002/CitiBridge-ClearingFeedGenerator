import React from "react";
import "../components/Sidebar.css";
import { HiOutlineHome } from "react-icons/hi";
import { VscHistory } from "react-icons/vsc";
import { BsCheck2Circle } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { HiOutlineChartPie } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import SidebarTab from "./SidebarTab";
function Sidebar() {
  return (
    <div className="sidebar__main">
      <img
        className="sidebar__citiLogo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/2560px-Citi.svg.png"
        alt=""
      ></img>
      <h3 style={{ margin: "9% 0 5% 0", color: "#1A1C37" }}>CitiBridge 2022</h3>

      <div className="sidebar__menu">
        <SidebarTab
          tabName="Home"
          link="/"
          icon={<HiOutlineHome size="20px"></HiOutlineHome>}
        ></SidebarTab>
        <SidebarTab
          tabName="Valid Records"
          link="/valid_records"
          icon={<BsCheck2Circle size="20px"></BsCheck2Circle>}
        ></SidebarTab>
        <SidebarTab
          tabName="Invalid Records"
          link="/invalid_records"
          icon={<FaRegTimesCircle size="20px"></FaRegTimesCircle>}
        ></SidebarTab>
        <SidebarTab
          tabName="Visualization"
          link="/visualization"
          icon={<HiOutlineChartPie size="20px"></HiOutlineChartPie>}
        ></SidebarTab>
      </div>

      <h5 style={{ margin: "30% 0 0 0" }}>Developed by Group 19</h5>
      <a href="https://github.com/ishashivalkar25/CitiBridge-ClearingFeedGenerator"> 
      <FaGithub
              size="28px"
              style={{ alignSelf: "center", marginTop: "5%", color: "#706c6c" }}
      ></FaGithub>
      </a>
    </div>
  );
}

export default Sidebar;
