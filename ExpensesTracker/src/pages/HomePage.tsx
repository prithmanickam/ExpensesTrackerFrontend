import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
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
import React from "react";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [category, setCategory] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Expenses graphs</Typography>
        <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} />
        <Typography>Asset graphs</Typography>
      </Stack>

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

      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh" // Adjust the height as per your requirements
      >
        <Button onClick={handleOpen}>Add Expenses</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              m="10"
            >
              Add Expense
            </Typography>
            <Stack>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Expense category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Catagory"
                  onChange={handleChange}
                >
                  <MenuItem value="ENTERTAINMENT">ENTERTAINMENT</MenuItem>
                  <MenuItem value="GROCERIES">GROCERIES</MenuItem>
                  <MenuItem value="UTILITIES">UTILITIES</MenuItem>
                  <MenuItem value="MISC">MISC</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Expense title/desc"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Expense amount"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Date (optional)"
                variant="outlined"
              />
              <Button variant="contained">Submit</Button>
            </Stack>
          </Box>
        </Modal>

        <Typography sx={{ fontSize: 24 }}>Past Transactions</Typography>

        {data.map((d) => {
          const { expenseAmount, expenseCategory, expenseDate, expenseName } =
            d;

          return (
            <>
              <Card variant="outlined" sx={{ minWidth: 675 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {expenseCategory}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {expenseName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    £{expenseAmount}
                  </Typography>
                  <Typography variant="body2">{expenseDate}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </>
          );
        })}
      </Stack>
    </div>
  );
};
export default HomePage;
