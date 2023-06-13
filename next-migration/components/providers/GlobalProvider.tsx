"use client";
import { ThreadContextProvider } from "@/context/ThreadContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const GlobalContextWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThreadContextProvider>
        <>{children}</>
      </ThreadContextProvider>
    </QueryClientProvider>
  );
};
export default GlobalContextWrapper;
