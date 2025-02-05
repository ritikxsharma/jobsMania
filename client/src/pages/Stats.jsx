import React from "react";
import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import { statsQuery } from "../handlers/loaders/getStatsLoader";

const Stats = () => {
  
  const data = useQuery(statsQuery)
  const { stats, monthlyApplications } = data.data
  
  return (
    <>
      <StatsContainer data={stats} />
      {
        monthlyApplications?.length > 1 && <ChartsContainer data={monthlyApplications} />
      }
    </>
  );
};

export default Stats;
