import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";
import {
  Categories,
  Transaction,
  TransactionContext,
} from "../context/TransactionContext";
import TransactionCard from "../components/TransactionCard";
import StackedBarChart from "../components/charts/StackedBarChart";
import DonutChart from "../components/charts/DonutChart";
import AntSwitch from "../components/basic/AntSwitch";
import { formatDate } from "../lib/utils";
import axios from "axios";
import { toast } from "react-hot-toast";

const HomePage: FC = () => {
  // Transaction state
  const { transactions, addTransaction } = useContext(TransactionContext);

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInput, setModalInput] = useState<Transaction>({
    category: "ENTERTAINMENT",
    type: "Expense",
    title: "",
    description: "",
    amount: "0",
    date: new Date(),
  });

  // pagination

  const dataPerPage = 2;

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(
    Math.ceil(transactions.length / dataPerPage)
  );

  const startIndex = (page - 1) * dataPerPage;

  const [selectData, setSelectData] = useState(
    transactions.slice(startIndex, startIndex + dataPerPage)
  );

  const [filter, setFilter] = useState(selectData);

  const handleChange = (event, value) => {
    const newStartIndex = (value - 1) * dataPerPage;
    const newFilter = transactions.slice(
      newStartIndex,
      newStartIndex + dataPerPage
    );
    setTotalPages(Math.ceil(transactions.length / dataPerPage));
    setPage(value);
    setFilter(newFilter);
  };

  // Example of connection to backend
  // Note: the transaction schema of our front and back end do not match yet

  // This useEffect runs whenever the page loads!
  const effectRan = useRef(false);
  useEffect(() => {
    const fetchAllExpenses = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "api/expense",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = response.data;
  
        console.log(data);
        toast.success('Fetched all expenses from the backend!')
      } catch (error) {
        toast.error('Could not fetch from backend')
      }
      
    };

    if (effectRan.current === false) fetchAllExpenses();

    return () => { effectRan.current = true; }
  }, []);

  const handlePost = async () => {
    try {
      const response = await axios.post('api/expense', {
        expenseName: "Tesco",
        expenseCategory: "ENTERTAINMENT",
        expenseAmount: 10
      });

      console.log(response)
      toast.success('Data sent to backend!') // Go check your Mongo Compass after this!
    } catch (error) {
      toast.error('Could not post to backend')
    }
  }

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
        <StackedBarChart />
        <DonutChart />
      </Stack>

      <Stack display="flex" justifyContent="center" alignItems="center">
        <Typography sx={{ fontSize: 24 }}>Balance: £5000</Typography>
        <Button onClick={() => setModalIsOpen(true)}>Add Expenses</Button>
        <Button onClick={handlePost}>Add/Post a new expense to backend/server</Button>
        <Modal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          aria-labelledby="modal-add-expense"
          aria-describedby="modal-add-expense"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              m="10"
            >
              Add Expense
            </Typography>
            <Stack direction="column">
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
                  <MenuItem value="RESTAURANT">RESTAURANT</MenuItem>
                  <MenuItem value="UTILITIES">UTILITIES</MenuItem>
                  <MenuItem value="MISC">MISC</MenuItem>
                </Select>

                <TextField
                  id="outlined-basic"
                  label="Expense title"
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
                      date: new Date(e.target.value as string),
                    }));
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  type="text"
                  value={modalInput?.description}
                  onChange={(e) => {
                    setModalInput((prev) => ({
                      ...prev,
                      description: e.target.value as string,
                    }));
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    addTransaction(modalInput);
                    if (modalInput.title.length > 0) {
                      setModalIsOpen(false);
                      setModalInput({
                        category: "ENTERTAINMENT",
                        type: "Expense",
                        title: "",
                        description: "",
                        amount: "0",
                        date: new Date(),
                      });
                    }
                  }}
                >
                  Submit
                </Button>
              </FormControl>
            </Stack>
          </Box>
        </Modal>

        <Typography sx={{ fontSize: 24 }}>Past Transactions</Typography>

        {filter.map((transaction, idx) => (
          <TransactionCard {...transaction} idx={idx} />
        ))}
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};
export default HomePage;
