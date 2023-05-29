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

  // Turn transactions into this shape
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
    const month = ((currentMonth - idx - 1 + 12) % 12) + 1; // work of the number of the current month
    fiveLatestMonthsTally[month] = { ...startingValues };
  }

  transactions.forEach((transaction) => {
    // TODO: Only work with the previous/current year. Also account where we fetch data from last year
    const { category, amount, date } = transaction;
    const transactionMonth = date.getMonth();

    fiveLatestMonthsTally[transactionMonth][category] += Number(amount);
  });

  type MonthDictionary = { [monthNumber: number]: string };

  const monthDictionary: MonthDictionary = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  // Turn our data into a GG Charts compatible one
  const stackedBarData = [["Month", ...categoriesArray]];

  for (let idx = 0; idx < 5; idx++) {
    const month = ((currentMonth - idx - 1 + 12) % 12) + 1; //works out number of the month (1-12)
    const monthString = monthDictionary[month + 1];

    const row: any[] = [monthString];

    categoriesArray.forEach((category) => {
      row.push(fiveLatestMonthsTally[month][category]);
    });

    stackedBarData.push(row);
  }

  const stackedBarOptions = {
    title: "Spend and distribution of categories last 5 months",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Expenses in Each Category (£)",
      minValue: 0,
    },
    vAxis: {
      title: "Past 5 Months",
    },
  };

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={stackedBarData}
      options={stackedBarOptions}
    />
  );
};

export default StackedBarChart;
