/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import toast from "react-hot-toast";

export type Categories =
  | "ENTERTAINMENT"
  | "GROCERIES"
  | "RESTAURANT"
  | "UTILITIES"
  | "MISC";

export type ExpenseOrAsset =
  | "Expense"
  | "Asset";

export type Transaction = {
  type: ExpenseOrAsset;
  category: Categories;
  title: string;
  description: string;
  amount: string;
  date: Date;
};

export const TransactionContext = createContext<{
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => void;
}>({
  transactions: [],
  addTransaction: () => {},
});

export const TransactionContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  // We'd pull this from our backend
  //year-month-day
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      type: "Expense",
      title: "Fish",
      description: "Bought Salmon on sale. Not sure why the meat's green though.",
      category: "GROCERIES",
      amount: '10',
      date: new Date("2023-05-27"),
    },
    {
      type: "Expense",
      title: "Tesco Food",
      description: "Totally not overloaded with sodium",
      category: "GROCERIES",
      amount: '5',
      date: new Date("2023-05-27"),
    },
    {
      type: "Expense",
      title: "Netflix subscription",
      description: "I forgot to unsubscribe",
      category: "ENTERTAINMENT",
      amount: '10',
      date: new Date("2023-05-27"),
    },
    {
      type: "Expense",
      title: "Netflix subscription",
      description: "this will be money well spent",
      category: "ENTERTAINMENT",
      amount: '10',
      date: new Date("2023-04-27"),
    },
    {
      type: "Expense",
      title: "Ramen Place",
      description: "The expenditure equals the value of sustenance for many sunsets, and my kin shall not grant me forgiveness",
      category: "RESTAURANT",
      amount: '20',
      date: new Date("2023-04-16"),
    },
  ]);

  const addTransaction = (newTransaction: Transaction): void => {
    if (newTransaction.title.length <= 0) {
      toast.error("Title cannot be empty")
      return;
    }

    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
