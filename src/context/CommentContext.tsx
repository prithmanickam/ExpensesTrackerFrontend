/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import toast from "react-hot-toast";

export type Comment = {
  text: string;
  likes: string;
  date: Date;
  replies: [];
};

export const CommentContext = createContext<{
  comments: Comment[];
  addComment: (newComment: Comment) => void;
}>({
  comments: [],
  addComment: () => {},
});

export const CommentContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  // We'd pull this from our backend
  //year-month-day
  const [comments, setComments] = useState<Comment[]>([
    {
      text: "yoooo.",
      likes: "7",
      date: new Date("2023-05-27"),
      replies: [],
    },
    {
      text: "bruh.",
      likes: "20",
      date: new Date("2023-05-27"),
      replies: [],
    },
  ]);

  const addComment = (newComment: Comment): void => {
    if (newComment.text.length <= 0) {
      toast.error("Comment cannot be empty");
      return;
    }

    setComments((prev) => [...prev, newComment]);
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        addComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
