"use client"

import { FC, useContext, useState } from "react";
import { Thread, ThreadContext } from "@/context/ThreadContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
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

const CommentCard: FC<Thread & { idx: number }> = ({
  id,
  text,
  likes,
  replies,
  date,
  idx,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const { removeThread, editThread } = useContext(ThreadContext);

  const commentDate = new Date(date);

  const handleDelete = async () => removeThread(id);

  const handleEdit = () => setEditMode(true);

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedText(text);
  };

  const constructEditedThread = () => ({ 
    id,
    text: editedText,
    likes,
    date,
    replies,
   })

  const handleSaveEdit = async () => {
    try {
      editThread(constructEditedThread());

      setEditMode(false); // Disable edit mode
      //setText(editedText); // Optimistically update the displayed text
    } catch (error) {
      toast.error((error as Error).message);
    }
    
  };

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

          {editMode ? (
            <TextField
              multiline
              rows={4}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          ) : (
            <Typography sx={{ mb: 1.5 }}>{text}</Typography>
          )}

          <Stack direction="column" justifyContent="space-between" spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Tooltip title="Like" placement="top" arrow>
                <IconButton
                // onClick: handle like request
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


              {editMode ? (
                <>
                  <Button onClick={handleCancelEdit}>Cancel</Button>
                  <Button onClick={handleSaveEdit}>Save</Button>
                </>
              ) : (
                <Tooltip title="Edit" placement="top" arrow>
                  <IconButton onClick={handleEdit}>
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
              )}

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
            {/* TODO: Fix the collapsible comment section */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {replies.map((reply) => <div>{reply}</div>)}
            </Collapse>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CommentCard;
