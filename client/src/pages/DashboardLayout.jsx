import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { BigSideBar, Navbar, SmallSideBar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import authApi from "../api/authApi";
import { toast } from "react-toastify";

const DashboardContext = createContext();

const DashboardLayout = ({ checkDefaultTheme }) => {

  const { user } = useLoaderData()  
  
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    
    setIsDarkTheme((prevState) => {
      const newDarkTheme = !prevState
      document.body.classList.toggle('dark-theme', newDarkTheme)
      localStorage.setItem('darkTheme', newDarkTheme)
      return newDarkTheme
    })    

  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logout = async() => {
    navigate('/', { replace: true })
    await authApi.logout()
    toast.success('Logged out successfully...')
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
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout;
