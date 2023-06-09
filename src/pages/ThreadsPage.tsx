import { Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from "react";

import CommentCard from "../components/CommentCard";
import { Thread, ThreadContext } from "../context/ThreadContext";
import { nanoid } from 'nanoid'

const ThreadsPage: FC = () => {
  const { threads, addThread, fetchAllThreads } = useContext(ThreadContext);

  // New thread input state
  const [newThread, setNewThread] = useState<Thread>({
    id:"",
    text: "",
    likes: "0",
    date: new Date(),
    replies: [],
  });

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewThread((prevComment) => ({
      ...prevComment,
      text: event.target.value,
    }));
  };

  const constructNewThread = () => ({
    poster: "change_when_theres_auth",
    text: newThread.text,
    likes: newThread.likes,
    replies: ["looks dope!", "jk", "ratio"],
    date: newThread.date,
    id: nanoid()
  })

  const handleCommentSubmit = async () => addThread(constructNewThread());
  
  // Fetch all threads on page load
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) fetchAllThreads();

    return () => {
      effectRan.current = true;
    };
  }, [fetchAllThreads]);

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
        value={newThread.text} // Set the value to newComment.text instead of newComment
        onChange={handleCommentChange}
        multiline
        rows={4}
      />
      <Button variant="contained" onClick={handleCommentSubmit}>
        Submit
      </Button>

      {threads.map(
        (thread, idx) => (
          (<CommentCard {...thread} idx={idx} />)
        )
      )}
    </Stack>
  );
};

export default ThreadsPage;
