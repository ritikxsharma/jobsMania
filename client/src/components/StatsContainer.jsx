import React from "react";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "./StatItem";
import { Wrapper } from "../assets/wrappers/StatsContainer";

const StatsContainer = ({ data }) => {
  const statsInfo = {
    pending: { icon: <FaSuitcaseRolling />, color: "#f59e0b", bcg: "#fef3c7" },
    interview: { icon: <FaCalendarCheck />, color: "#647acb", bcg: "#e0e8f9" },
    declined: { icon: <FaBug />, color: "#DC143C", bcg: "#ffeeee" },
  };
  return (
    <Wrapper>
      {Object.entries(data).map(([title, count], index) => {
        const { icon, color, bcg } = statsInfo[title];        
        return (
          <StatItem
            key={index}
            title={title}
            count={count || 0}
            color={color}
            bcg={bcg}
            icon={icon}
          />
        );
      })}
    </Wrapper>
  );
};

export default StatsContainer;
