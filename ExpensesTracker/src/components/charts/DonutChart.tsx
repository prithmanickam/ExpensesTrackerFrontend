import { FC, useContext } from "react";
import {
  Categories,
  Transaction,
  TransactionContext,
} from "../../context/TransactionContext";
import { Chart } from "react-google-charts";
import { Stack } from "@mui/material";

const StackedBarChart: FC = () => {
  const { transactions } = useContext(TransactionContext);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const currentMonth = Number(formattedDate.substring(3, 5));

  // Desired data structure
  // { month: {
  //    category: summedAmount
  // } }

  const fiveLatestMonthsTally: {
    [month: number]: {
      [key in Categories]: number;
    };
  } = {};


  const categoriesArray: Categories[] = [
    "ENTERTAINMENT",
    "GROCERIES",
    "RESTAURANT",
    "UTILITIES",
    "MISC",
  ];

  // Should look like this
  // {
  //   ENTERTAINMENT: 0,
  //   GROCERIES: 0,
  //   RESTAURANT: 0,
  //   UTILITIES: 0,
  //   MISC: 0,
  // };
  const startingValues = Object.fromEntries(
    categoriesArray.map((category) => [category, 0])
  ) as {
    [key in Categories]: number;
  };

  for (let idx = 0; idx < 5; idx++) {
    const month = ((currentMonth - idx - 1 + 12) % 12) + 1; //works out number of the month (1-12)
    fiveLatestMonthsTally[month] = { ...startingValues };
  }

  transactions.forEach((transaction) => {
    const { category, amount, date } = transaction;
    const transactionMonth = date.getMonth();

    fiveLatestMonthsTally[transactionMonth][category] += Number(amount);
  });

  const donutGraphData = [
    ["Category", "£ spent"],
    ["Groceries", fiveLatestMonthsTally[currentMonth-1]["GROCERIES"]],
    ["Entertainment", fiveLatestMonthsTally[currentMonth-1]["ENTERTAINMENT"]],
    ["Restaurant", fiveLatestMonthsTally[currentMonth-1]["RESTAURANT"]],
    ["Utlities", fiveLatestMonthsTally[currentMonth-1]["UTILITIES"]],
    ["Misc", fiveLatestMonthsTally[currentMonth-1]["MISC"]],
  ];

  const donutGraphOptions = {
    title: "This month category spread",
    pieHole: 0.4,
    is3D: false,
  };


  return (
          <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={donutGraphData}
        options={donutGraphOptions}
      />
  );
};

export default StackedBarChart;
