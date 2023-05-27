/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

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
      category: "GROCERIES",
      amount: '10',
      date: new Date("2023-05-27"),
    },
    {
      type: "Expense",
      title: "Tesco Food",
      category: "RESTAURANT",
      amount: '5',
      date: new Date("2023-05-27"),
    },
  ]);

  const addTransaction = (newTransaction: Transaction): void => {
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
