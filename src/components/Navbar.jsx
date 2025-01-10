import React, { useState } from "react";
import { styles } from "../styles";
import logo from "/templelogo.png";
import {useNavigate} from "react-router-dom"
const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold">
            BaghBhairav &nbsp;<span className="hidden sm:inline">| Kirtipur</span>
          </p>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex justify-end items-center">
          <img
            src={toggle ? "/close.png" : "/menulogo.jpg"} // Placeholder for menu icons
            alt="menu"
            className="w-8 h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        {/* Mobile Dropdown Menu */}
        {toggle && (
          <div className="sm:hidden absolute top-20 right-4 bg-primary p-6 rounded-xl shadow-md z-10">
            <ul className="list-none flex flex-col gap-4">
              {/* Placeholder links */}
              <li className="text-white text-[16px] cursor-pointer">Home</li>
              <li className="text-white text-[16px] cursor-pointer">About</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
