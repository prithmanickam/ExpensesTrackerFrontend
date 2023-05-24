import { Stack } from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { Chart } from "react-google-charts";
import {
  data as chartsData,
  options,
  stackedBarData,
  stackedBarOptions,
  barChartData,
  barChartOptions,
} from "../constants/chartsMockData";

type Transaction = {
  expenseName: string;
  expenseCategory:
    | "ENTERTAINMENT"
    | "GROCERIES"
    | "RESTAURANT"
    | "UTILITIES"
    | "MISC";
  expenseAmount: number;
  expenseDate: string;
};

const getMockedData = (): Transaction[] => {
  return [
    {
      expenseName: "Fish",
      expenseCategory: "GROCERIES",
      expenseAmount: 10,
      expenseDate: "10-10-2023",
    },
    {
      expenseName: "Tesco Food",
      expenseCategory: "GROCERIES",
      expenseAmount: 5,
      expenseDate: "03-05-2017",
    },
  ];
};

// @Field(name = "name")
//     @Indexed(unique = true)
//     private String expenseName;

//     @Field(name = "category")
//     private ExpenseCategory expenseCategory;

//     @Field(name = "amount")
//     private BigDecimal expenseAmount;

// public enum ExpenseCategory {
//   ENTERTAINMENT, GROCERIES, RESTAURANT, UTILITIES, MISC
// }

const HomePage: FC = () => {
  const [data, setData] = useState<Transaction[]>(getMockedData());
  // const dataRef = useRef(data);

  useEffect(() => {
    // Executes when dependency array changes
    // pushToHomePage();
  }, [data]);

  useEffect(() => {
    // Executes on page load
  }, []);

  // useContext();

  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Chart
          chartType="PieChart"
          data={chartsData}
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

      <div>
        {data.map((d) => {
          const { expenseAmount, expenseCategory, expenseDate, expenseName  } = d

          return (
            <div>
              <div>{expenseAmount}</div>
              <div>{expenseCategory}</div>
              <div>{expenseDate}</div>
              <div>{expenseName}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
export default HomePage;
