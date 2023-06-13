/* eslint-disable @typescript-eslint/no-empty-function */
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import toast from "react-hot-toast";
import { responseIsOk } from "../lib/utils";

export type Thread = {
  id: string;
  text: string;
  likes: string;
  date: Date;
  replies: string[];
};

export const ThreadContext = createContext<{
  threads: Thread[];
  addThread: (inputText: Thread) => void;
  removeThread: (id: string) => void;
  fetchAllThreads: () => void,
  editThread: (editedThread: Thread) => void
}>({
  threads: [],
  addThread: () => {},
  removeThread: () => {},
  fetchAllThreads: () => {},
  editThread: () => {}
});

export const ThreadContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [threads, setThreads] = useState<Thread[]>([
  ]);

  const addThread = async (newThread: Thread) => {
    // Check if text input's  empty
    if (newThread.text.length <= 0) {
      toast.error("Input text cannot be empty");
      return;
    }

    try {
      // Optimisitcally add a thread
      setThreads((prev) => [...prev, newThread]);
      
      // Post to server
      const response = await axios.post("api/db", newThread);

      // TODO: If successful, clear the input field
      if (responseIsOk(response.status)) { 
        return toast.success("Thread added!")
      }
      
      throw new Error();
    } catch (error) {
      // If request unsucessful, remove the optimiscally updated thread
      toast.error((error as Error).message);
      setThreads((prev) => (prev.filter((thread) => thread.id !== newThread.id)))
    }

  };

  const removeThread = async (id: string) => {
    const soonToBeRemovedThread = threads.filter((thread) => thread.id === id);

    try {
      const response = await axios.delete(`api/post/${id}`);
      
      // Optimistically remove thread
      setThreads((prev) => (prev.filter((thread) => thread.id !== id)))

      if (responseIsOk(response.status)) {
        return toast.success("Comment deleted!")
      }

      throw new Error()
    } catch (error) {
      // TODO: Add the comment back into place if request failed
      toast.error("Could not remove thread");
      setThreads((prev) => (prev.concat(soonToBeRemovedThread)))
    }
  }

  const fetchAllThreads = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "api/db",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      
      if (data.length > 0) {
        setThreads(data.map((comment: Thread) => ({
          id: comment.id,
          text: comment.text,
          likes: comment.likes,
          date: comment.date,
          replies: comment.replies,
        })))
      }

      if (responseIsOk(response.status)) { 
        return toast.success("Fetched threads");
      }

      throw new Error()
    } catch (error) {
      toast.error("Could not fetch posts");
    }
  };

  const editThread = async (editedThread: Thread) => {
    const originalThread = threads.find((thread) => thread.id === editedThread.id);

    try {
      const response = await axios.put(`api/post`, editedThread);

      // Optimiscally update the thread
      // TODO: Extra validation
      setThreads((prev) => prev.map((thread) => thread.id === editedThread.id ? editedThread : thread));

      if (responseIsOk(response.status)) {
        return toast.success("Thread edited!")
      }
      
      throw new Error("Failed to edit thread");
    } catch (error) {
      // Revert the optimistically updated thread
      toast.error("Could not edit thread");

      // TODO: Make sure this is correct I wrote this at 1 in the morning lol
      if (originalThread) {
        setThreads((prev) => prev.map((thread) =>
          thread.id === editedThread.id ? originalThread : thread
        ));
      }
    }
  }

  return (
    <ThreadContext.Provider
      value={{
        threads,
        addThread,
        removeThread,
        fetchAllThreads,
        editThread
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
};
