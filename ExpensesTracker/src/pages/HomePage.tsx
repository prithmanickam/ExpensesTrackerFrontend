import { Stack } from "@mui/material";
import { FC } from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
  };

  export const barChartData = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];
  
  export const barChartOptions = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    colors: ["#b0120a", "#ffab91"],
    hAxis: {
        title: "Total Population",
    minValue: 0,
  },
  vAxis: {
    title: "City",
  },
};

  export const stackedBarData = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];
  
  export const stackedBarOptions = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };


const HomePage: FC = () => {
    return (
      <div>
    <Stack
     direction={{ xs: 'column', sm: 'row' }}
  justifyContent="center"
  alignItems="center"
  spacing={2}>
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />

    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={stackedBarData}
      options={stackedBarOptions}
    />

    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={barChartData}
      options={barChartOptions}
    />
    </Stack>
    
        
    </div>
    );
}
export default HomePage;
