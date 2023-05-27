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
import TextareaAutosize from "@mui/base/TextareaAutosize";
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
import {
  Categories,
  Transaction,
  TransactionContext,
} from "../context/TransactionContext";
import TransactionCard from "../components/TransactionCard";

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
  // Transaction state
  const { transactions, addTransaction } = useContext(TransactionContext);

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInput, setModalInput] = useState<Transaction>({
    category: "ENTERTAINMENT",
    type: "Expense",
    title: "",
    amount: "0",
    date: new Date(),
  });

  const formatDate = (date: Date): string => {
    const d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    return [
      year,
      month.length < 2 ? "0" + month : month,
      day.length < 2 ? "0" + day : day,
    ].join("-");
  };

  // here

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
        {/* <StackedBarChart /> */}
        {/* <Chart
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
        /> */}
      </Stack>

      <Stack display="flex" justifyContent="center" alignItems="center">
        <Typography sx={{ fontSize: 24 }}>Balance: £5000</Typography>
        <Button onClick={() => setModalIsOpen(true)}>Add Expenses</Button>
        <Modal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
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
                  value={modalInput?.category}
                  label="Catagory"
                  onChange={(e) => {
                    setModalInput((prev) => ({
                      ...prev,
                      category: e.target.value as Categories,
                    }));
                  }}
                >
                  <MenuItem value="ENTERTAINMENT">ENTERTAINMENT</MenuItem>
                  <MenuItem value="GROCERIES">GROCERIES</MenuItem>
                  <MenuItem value="UTILITIES">UTILITIES</MenuItem>
                  <MenuItem value="MISC">MISC</MenuItem>
                </Select>

                <TextField
                  id="outlined-basic"
                  label="Expense title/desc"
                  variant="outlined"
                  type="text"
                  value={modalInput?.title}
                  onChange={(e) => {
                    setModalInput((prev) => ({
                      ...prev,
                      title: e.target.value as string,
                    }));
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Expense amount"
                  variant="outlined"
                  type="number"
                  value={modalInput?.amount}
                  onChange={(e) => {
                    setModalInput((prev) => ({
                      ...prev,
                      amount: e.target.value as string,
                    }));
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Date"
                  variant="outlined"
                  type="date"
                  value={modalInput?.date ? formatDate(modalInput.date) : ""}
                  onChange={(e) => {
                    setModalInput((prev) => ({
                      ...prev,
                      date: new Date(e.target.value),
                    }));
                  }}
                />
                
                  

                <Button
                  variant="contained"
                  onClick={() => {
                    addTransaction(modalInput);
                    setModalIsOpen(false);
                  }}
                >
                  Submit
                </Button>
              </FormControl>
            </Stack>
          </Box>
        </Modal>

        <Typography sx={{ fontSize: 24 }}>Past Transactions</Typography>

        {transactions.map((transaction, idx) => (
          <TransactionCard {...transaction} idx={idx} />
        ))}
      </Stack>
    </div>
  );
};
export default HomePage;
