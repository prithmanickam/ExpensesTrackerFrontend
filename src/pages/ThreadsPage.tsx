import { Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";

import CommentCard from "../components/CommentCard";
import { Comment, CommentContext } from "../context/CommentContext";
import axios from "axios";
import toast from "react-hot-toast";

const ThreadsPage: FC = () => {
  const { comments, addComment } = useContext(CommentContext);

  const [newComment, setNewComment] = useState<Comment>({
    id:"",
    text: "",
    likes: "0",
    date: new Date(),
    replies: [],
  });

  //console.log(comments.length);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment((prevComment) => ({
      ...prevComment,
      text: event.target.value,
    }));
  };

  const handleCommentSubmit = async () => {
    addComment(newComment);
    setNewComment({
      id:"",
      text: "",
      likes: "0",
      date: new Date(),
      replies: [],
    });
    try {
      const response = await axios.post("http://localhost:8080/api/post", {
        poster: "username",
        text: newComment.text,
        likes: newComment.likes,
        replies: ["looks dope!", "jk", "ratio"],
        date: newComment.date,
      });

      toast.success("Post sent to backend!");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setTimeout(() => {
      location.reload();
    }, 500)
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

        const fetchedComments = data.map((comment: Comment) => ({
          id: comment.id,
          text: comment.text,
          likes: comment.likes,
          date: comment.date,
          replies: comment.replies,
        }));

        fetchedComments.forEach((comment) => {
          addComment(comment);
        });

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
          (<CommentCard {...comment} idx={idx} />)
        )
      )}
    </Stack>
  );
};

export default ThreadsPage;
