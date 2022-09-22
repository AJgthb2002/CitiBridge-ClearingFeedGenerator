import React from "react";
import "../components/SidebarTab.css";
function SidebarTab(props) {
  const { icon, link, tabName } = props;
  return (
    <div className="sidebartab__main grow">
      <div className="sidebartab__icon">{icon}</div>

      <a href={link}>
        <h5 className="tabName"> {tabName}</h5>
      </a>
    </div>
  );
}

export default SidebarTab;
