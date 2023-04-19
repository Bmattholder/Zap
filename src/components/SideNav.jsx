import React from "react";
import { Link } from "react-router-dom";

import { TiHome } from "react-icons/ti";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";

import "./SideNav.css";

function SideNav(props) {
  return (
    <div className="side-nav">
      <Link to="/">
        <TiHome /> {" Home"}
      </Link>
      <Link to="/dashboard">
        <AiOutlineDashboard /> Dashboard
      </Link>
      <Link to="/new-ticket">
        <BiAddToQueue /> New Issue
      </Link>
    </div>
  );
}

export default SideNav;
