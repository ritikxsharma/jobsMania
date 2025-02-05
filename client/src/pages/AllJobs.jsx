import React, { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { SearchContainer, JobsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import { allJobsQuery } from "../handlers/loaders/allJobsLoader";

const AllJobsContext = createContext();

const AllJobs = () => {
  const { searchValues } = useLoaderData();

  const { data } = useQuery(allJobsQuery(searchValues));

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};

export default AllJobs;
