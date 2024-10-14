import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DatePicker from "./ui/DatePicker";
import QueryProvider from "./hooks/QueryProvider";
import App, { CabinTable, Test } from "./App";
import QueryClient from "./hooks/QueryClient";

// createRoot(document.getElementById("root")).render(<DatePicker />);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryProvider client={queryClient}>
    <App />
    <Test />
    <CabinTable />
  </QueryProvider>
);
