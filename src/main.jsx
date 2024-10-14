import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DatePicker from "./ui/DatePicker";

createRoot(document.getElementById("root")).render(<DatePicker />);
