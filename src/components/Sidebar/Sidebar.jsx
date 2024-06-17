import React, { useState, useEffect } from "react";
import "./Sidebar.css";

import logo from "../../assets/logoiise.png";

function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button className='hamburger' onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isActive || isDesktop ? "active" : ""}`}>
        <span id='logo'>
          <img src={logo} alt='' />
        </span>
        <span id='heading'>IISE AlumniConnect</span>
        <span className='closebtn' onClick={toggleSidebar}>
          &times;
        </span>
        <a href='/'>Home</a>
        <a href='/events'>Events</a>
        <a href='/alumni'>Alumni</a>
        <a href='/opportunity'>Opportunities</a>
        <a href='/reports'>Reports</a>
        <a href='/login'>Logout</a>
      </div>
    </div>
  );
}

export default Sidebar;
