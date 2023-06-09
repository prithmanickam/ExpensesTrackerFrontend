import { FC, useState } from "react";
import { Comment } from "../context/CommentContext";
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
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import toast from "react-hot-toast";

const CommentCard: FC<Comment & { idx: number }> = ({
  id,
  text,
  likes,
  replies,
  date,
  idx,
}) => {
  const [expanded, setExpanded] = useState(false);

  const commentDate = new Date(date);

  const handleDelete = async () => {
    const myId = {id}.id;

    console.log("http://localhost:8080/api/post/" + myId)
    try {
      const response = await axios.delete("http://localhost:8080/api/post/" + myId);
      console.log(response);
      toast.success("Post sent to backend!");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setTimeout(() => {
      location.reload();
    }, 500)
  }

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
          borderColor: "blue",
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
              Username
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {commentDate.getDate()}/{commentDate.getMonth() + 1}/
              {commentDate.getFullYear()}
            </Typography>
          </Stack>

          <Typography sx={{ mb: 1.5 }}>{text}</Typography>

          <Stack direction="column" justifyContent="space-between" spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Tooltip title="Like" placement="top" arrow>
                <IconButton
                // onClick: handle deletion request
                >
                  <ThumbUpIcon
                    color="error"
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit" placement="top" arrow>
                <IconButton
                // onClick: handle edit request
                >
                  <EditIcon
                    color="error"
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" placement="top" arrow>
                <IconButton
                // onClick: handle deletion request
                onClick={handleDelete}
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
            {text.length > 0 ? (
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {text}
              </Collapse>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CommentCard;
