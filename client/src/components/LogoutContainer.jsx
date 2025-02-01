import React, { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        { user?.firstName }
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout? 'show-dropdown' : ''} `}>
        <button type="button" className="dropdown-btn" onClick={logout}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
