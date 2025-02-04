import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  EditJob,
  Admin,
} from "./pages";

import { ToastContainer } from "react-toastify";
import { loginAction, registerAction } from "./handlers/actions/authActions";
import { dashboardLoader } from "./handlers/loaders/dashboardLoader";
import {
  createJobAction,
  deleteJobAction,
  updateJobAction,
} from "./handlers/actions/jobActions";
import { allJobsLoader } from "./handlers/loaders/allJobsLoader";
import { editJobLoader } from "./handlers/loaders/editPageLoader";
import { adminLoader } from "./handlers/loaders/adminLoader";
import { updateProfileAction } from "./handlers/actions/userActions";
import { userStatsLoader } from "./handlers/loaders/userStatsLoader";
import Stats from "./pages/Stats";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
          action: registerAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "dashboard",
          element: <DashboardLayout checkDefaultTheme={checkDefaultTheme} />,
          loader: dashboardLoader,
          children: [
            {
              index: true,
              element: <AllJobs />,
              loader: allJobsLoader,
            },
            {
              path: "add-job",
              element: <AddJob />,
              action: createJobAction,
            },
            {
              path: "profile",
              element: <Profile />,
              action: updateProfileAction,
            },
            {
              path: "admin",
              element: <Admin />,
              loader: adminLoader,
            },
            {
              path: "edit-job/:id",
              element: <EditJob />,
              loader: editJobLoader,
              action: updateJobAction,
            },
            {
              path: "delete-job/:id",
              action: deleteJobAction,
            },
            {
              path: "stats",
              element: <Stats />,
              loader: userStatsLoader,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-right" autoClose={3000} />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
