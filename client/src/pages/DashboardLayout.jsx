import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { BigSideBar, Navbar, SmallSideBar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";

const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = {
    name: "John",
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log(`toggle dark theme`);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logout = () => {
    console.log("logout user");
  };

  return (
    <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleSidebar, toggleDarkTheme, logout}}>
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout;
