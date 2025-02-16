import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
} from "./pages";

const AllJobs = lazy(() => import("./pages/AllJobs"));
const AddJob = lazy(() => import("./pages/AddJob"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const EditJob = lazy(() => import("./pages/EditJob"));
const Stats = lazy(() => import("./pages/Stats"));
const ErrorComponent = lazy(() => import("./components/ErrorComponent"));

import { ToastContainer } from "react-toastify";
import { loginAction, registerAction } from "./handlers/actions/authActions";
import { dashboardLoader } from "./handlers/loaders/dashboardLoader";
import {
  createJobAction,
  deleteJobAction,
  editJobAction,
} from "./handlers/actions/jobActions";
import { allJobsLoader } from "./handlers/loaders/allJobsLoader";
import { editJobLoader } from "./handlers/loaders/editJobLoader";
import { adminLoader } from "./handlers/loaders/adminLoader";
import { updateProfileAction } from "./handlers/actions/userActions";
import { getStatsLoader } from "./handlers/loaders/getStatsLoader";
import { Loader } from "./components";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 2,
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
          action: loginAction(queryClient),
        },
        {
          path: "dashboard",
          element: (
            <DashboardLayout
              checkDefaultTheme={checkDefaultTheme}
              queryClient={queryClient}
            />
          ),
          loader: dashboardLoader(queryClient),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Loader />}>
                  <AllJobs />
                </Suspense>
              ),
              loader: allJobsLoader(queryClient),
              errorElement: (
                <Suspense fallback={<Loader />}>
                  <ErrorComponent />
                </Suspense>
              ),
            },
            {
              path: "add-job",
              element: (
                <Suspense fallback={<Loader />}>
                  <AddJob />
                </Suspense>
              ),
              action: createJobAction(queryClient),
            },
            {
              path: "profile",
              element: (
                <Suspense fallback={<Loader />}>
                  <Profile />
                </Suspense>
              ),
              action: updateProfileAction(queryClient),
            },
            {
              path: "admin",
              element: (
                <Suspense fallback={<Loader />}>
                  <Admin />
                </Suspense>
              ),
              loader: adminLoader,
            },
            {
              path: "edit-job/:id",
              element: (
                <Suspense fallback={<Loader />}>
                  <EditJob />
                </Suspense>
              ),
              loader: editJobLoader(queryClient),
              action: editJobAction(queryClient),
            },
            {
              path: "delete-job/:id",
              action: deleteJobAction(queryClient),
            },
            {
              path: "stats",
              element: (
                <Suspense fallback={<Loader />}>
                  <Stats />
                </Suspense>
              ),
              loader: getStatsLoader(queryClient),
              errorElement: <ErrorComponent />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-right" autoClose={2000} />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
