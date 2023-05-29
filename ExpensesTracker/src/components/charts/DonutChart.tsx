import { FC, useContext } from "react";
import {
  Categories,
  TransactionContext,
} from "../../context/TransactionContext";
import { Chart } from "react-google-charts";

const StackedBarChart: FC = () => {
  const { transactions } = useContext(TransactionContext);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const currentMonth = Number(formattedDate.substring(3, 5));

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
  const currMonthTally = Object.fromEntries(
    categoriesArray.map((category) => [category, 0])
  ) as {
    [key in Categories]: number;
  };

  transactions.forEach((transaction) => {
    const { category, amount, date } = transaction;
    const transactionMonth = date.getMonth();

    if (transactionMonth + 1 == currentMonth) {
      currMonthTally[category] += Number(amount);
    }
  });

  const donutGraphData = [
    ["Category", "£ spent"],
    ["Groceries", currMonthTally["GROCERIES"]],
    ["Entertainment", currMonthTally["ENTERTAINMENT"]],
    ["Restaurant", currMonthTally["RESTAURANT"]],
    ["Utlities", currMonthTally["UTILITIES"]],
    ["Misc", currMonthTally["MISC"]],
  ];

  const donutGraphOptions = {
    title: "This month category distribution",
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
