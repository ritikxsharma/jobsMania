import React from "react";
import { FaAlignLeft, FaHome } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/Navbar";
const Navbar = () => {
  const {
    toggleSidebar
  } = useDashboardContext()
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft/>
        </button>
        <div>
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">toggle and logout</div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
