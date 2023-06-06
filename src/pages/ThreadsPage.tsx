import { Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";

import CommentCard from "../components/CommentCard";
import { Comment, CommentContext } from "../context/CommentContext";
import axios from "axios";
import toast from "react-hot-toast";

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

  // Fetches all threads
  const effectRan = useRef(false);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:8080/api/post",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = response.data;

        console.log(data);
        toast.success("Fetched all posts");
      } catch (error) {
        toast.error("Could not posts");
      }
    };

    if (effectRan.current === false) fetchAllPosts();

    return () => {
      effectRan.current = true;
    };
  }, []);

  const handleCreateNewPost = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/post", {
        poster: "JAKEJAKEJAKEJAKEJAKEJAKEJAKEJAKEJAKE",
        text: "yo this is my comment!",
        likes: 15,
        replies: ["looks dope!", "jk", "ratio"],
      });

      console.log(response);
      toast.success("Post sent to backend!");
    } catch (error) {
      toast.error((error as Error).message);
    }
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
      <Button variant="contained" onClick={handleCreateNewPost}>
        Create new post (with fixed data)
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
