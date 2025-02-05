import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { BigSideBar, Loader, Navbar, SmallSideBar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { userQuery } from "../handlers/loaders/dashboardLoader";

const DashboardContext = createContext();

const DashboardLayout = ({ checkDefaultTheme, queryClient }) => {
  const { user } = useQuery(userQuery).data  
  const navigate = useNavigate();
  const navigation = useNavigation()
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  useEffect(() => {
    if (navigation.state === "loading") {
      setIsPageLoading(true);
    }else{
      setTimeout(() => {
        setIsPageLoading(false);
      }, 500);        
    }
  }, [navigation.state]);

  const toggleDarkTheme = () => {
    setIsDarkTheme((prevState) => {
      const newDarkTheme = !prevState;
      document.body.classList.toggle("dark-theme", newDarkTheme);
      localStorage.setItem("darkTheme", newDarkTheme);
      return newDarkTheme;
    });
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logout = async () => {
    navigate("/", { replace: true });
    await authApi.logout();
    queryClient.invalidateQueries()
    toast.success("Logged out successfully...");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logout,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loader /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
