import React from "react";
import ReactApexChart from "react-apexcharts";

export const StackedColumnChart = (props) => {
  return props.options && props.series ? (
    <React.Fragment>
      <ReactApexChart
        options={props.options}
        series={props.series}
        type={props.type}
        height="359"
      />
    </React.Fragment>
  ) : null;
};

export default StackedColumnChart;
