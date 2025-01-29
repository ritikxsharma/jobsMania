import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  AddJob,
  AllJobs,
  Profile,
  Error,
} from "./pages";

import { ToastContainer } from 'react-toastify'

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "dashboard",
          element: <DashboardLayout checkDefaultTheme={checkDefaultTheme} />,
          children: [
            {
              index: true,
              element: <AddJob />,
            },
            {
              path: "all-jobs",
              element: <AllJobs />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='*' element={ <Error/> } />
    //     <Route path='/' element={ <HomeLayout/> }>
    //       <Route index={true} element={ <Landing/> } />
    //       <Route path='register' element={ <Register/> } />
    //       <Route path='login' element={ <Login/> } />
    //       <Route path='dashboard' element={ <DashboardLayout/> } />
    //       <Route path='error' element={ <Error/> } />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
