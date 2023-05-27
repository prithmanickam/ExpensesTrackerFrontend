import { FC, useState } from "react";
import { Transaction } from "../context/TransactionContext";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const TransactionCard: FC<Transaction & { idx: number }> = ({
  amount,
  category,
  date,
  title,
  type,
  idx,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 500,
          m: 1,
          boxShadow: 3,
          borderWidth: 2,
          borderColor: type === "Expense" ? "red" : "blue",
        }}
        key={`transaction-${idx}`}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
            spacing={2}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {category}
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
            </Typography>
          </Stack>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            £{amount}
          </Typography>

          <Stack direction="column" justifyContent="space-between" spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Box
                sx={{
                  visibility: description.length > 0 ? "" : "hidden",
                }}
              >
                <Tooltip
                  title={!expanded ? "Read More" : "Collapse"}
                  placement="top"
                  arrow
                >
                  <IconButton onClick={() => setExpanded((prev) => !prev)}>
                    {!expanded ? (
                      <ExpandMoreIcon
                        sx={{
                          ":hover": {
                            cursor: "pointer",
                          },
                        }}
                      />
                    ) : (
                      <ExpandLessIcon
                        sx={{
                          ":hover": {
                            cursor: "pointer",
                          },
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <Tooltip title="Delete" placement="top" arrow>
                <IconButton
                  // onClick: handle deletion request
                >
                  <DeleteIcon
                    color="error"
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
            {description.length > 0 ? (
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {description}
              </Collapse>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionCard;
