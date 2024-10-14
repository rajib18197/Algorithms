import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DatePicker from "./ui/Calendar.jsx";

createRoot(document.getElementById("root")).render(<DatePicker />);
