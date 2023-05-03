import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { TiHome } from "react-icons/ti";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";

import "./SideNav.css";

function SideNav(props) {
  const navigate = useNavigate();
  const logoHelper = () => {
    navigate("/");
  };

  return (
    <div className="side-nav">
      <div className="logo" onClick={logoHelper}>
        <img src={require("../assets/zap_logo.png")} alt="logo" /> <h2>Zap</h2>
      </div>
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
