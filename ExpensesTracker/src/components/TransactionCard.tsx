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

const DemoComponent = () => {
  return (
    <>
      <Typography paragraph>Method:</Typography>
      <Typography paragraph>
        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
        aside for 10 minutes.
      </Typography>
      <Typography paragraph>
        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        large plate and set aside, leaving chicken and chorizo in the pan. Add
        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and
        cook, stirring often until thickened and fragrant, about 10 minutes. Add
        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
      </Typography>
      <Typography paragraph>
        Add rice and stir very gently to distribute. Top with artichokes and
        peppers, and cook without stirring, until most of the liquid is
        absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
        shrimp and mussels, tucking them down into the rice, and cook again
        without stirring, until mussels have opened and rice is just tender, 5
        to 7 minutes more. (Discard any mussels that don&apos;t open.)
      </Typography>
      <Typography>
        Set aside off of the heat to let rest for 10 minutes, and then serve.
      </Typography>
    </>
  );
};

const TransactionCard: FC<Transaction & { idx: number }> = ({
  amount,
  category,
  date,
  title,
  type,
  idx,
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
            direction={{ xs: "column", sm: "row" }}
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
              <Tooltip
                title={!expanded ? "Read More" : "Collapse"}
                placement="top"
                arrow
              >
                {!expanded ? (
                  <ExpandMoreIcon
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => setExpanded((prev) => !prev)}
                  />
                ) : (
                  <ExpandLessIcon
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => setExpanded((prev) => !prev)}
                  />
                )}
              </Tooltip>

              <Tooltip title="Delete" placement="top" arrow>
                <DeleteIcon
                  color="error"
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </Tooltip>
            </Stack>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <DemoComponent />
            </Collapse>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionCard;
