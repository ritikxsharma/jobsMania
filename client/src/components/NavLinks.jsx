import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link, index) => {
        if(link.path === 'admin' && user.role !== 'admin') return
        return (
          <NavLink
            key={index}
            to={link.path}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
          >
            <span className="icon">{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
