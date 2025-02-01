import React from "react";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/BigSidebar";

const SideBar = () => {
  const { showSidebar } = useDashboardContext();
  
  return (
    <Wrapper>
      <div
        className={`sidebar-container ${!showSidebar ? "show-sidebar" : ""}`}
      >
        <div className="content">
          <header>
            Jobs Mania
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default SideBar;
