import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Barchart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            borderRadius: "8px",
          }}
          labelStyle={{color: "#fff"}}
          itemStyle={{color: '#fff'}}
        />
        <Bar dataKey="count" fill="#2cb1bc" barSize={60} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
