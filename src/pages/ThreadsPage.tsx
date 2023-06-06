import { Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";

import CommentCard from "../components/CommentCard";
import { CommentContext } from "../context/CommentContext";

const ThreadsPage: FC = () => {
  const { comments, addComment } = useContext(CommentContext);

  const [newComment, setNewComment] = useState<Comment>({
    text: "",
    likes: "0",
    date: new Date(),
  });

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment((prevComment) => ({
      ...prevComment,
      text: event.target.value,
    }));
  };

  const handleCommentSubmit = () => {
    addComment(newComment);
    setNewComment({
      text: "",
      likes: "0",
      date: new Date(),
    });
  };

  return (
    <Stack
      display="flex"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <TextField
        id="outlined-multiline-static"
        label="Enter Comment"
        value={newComment.text} // Set the value to newComment.text instead of newComment
        onChange={handleCommentChange}
        multiline
        rows={4}
      />
      <Button variant="contained" onClick={handleCommentSubmit}>
        Submit
      </Button>

      {comments.map(
        (comment, idx) => (
          console.log(comments.length), (<CommentCard {...comment} idx={idx} />)
        )
      )}
    </Stack>
  );
};

export default ThreadsPage;
