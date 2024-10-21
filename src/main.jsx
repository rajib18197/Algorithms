import { memo, StrictMode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DatePicker from "./ui/DatePicker";
import QueryProvider from "./hooks/QueryProvider";
import App, { CabinTable } from "./App";
import QueryClient from "./hooks/QueryClient";
import Test from "./Test";

// createRoot(document.getElementById("root")).render(<DatePicker />);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <Counter />
  <Test />
  // <QueryProvider client={queryClient}>
  //   <App />
  //   <Test />
  //   <CabinTable />
  // </QueryProvider>
);

function Button({ children, onClick }) {
  console.log("Button", Math.random().toFixed(1));
  return <button onClick={onClick}>{children}</button>;
}

const OptimizedButton = memo(Button);

function Counter() {
  console.log("Counter", Math.random().toFixed(1));
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      4000
    );

    return () => clearInterval(interval);
  }, []);

  const onClick = useCallback(function handleClick() {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <h3>{time}</h3>
      <p>{count}</p>
      {/* Some Observation: If we give dynamic value in the "children prop" then optimization does not work even if count value is same as previous render */}
      <OptimizedButton onClick={onClick}>Increment {count}</OptimizedButton>
    </div>
  );
}

// “If you are not aggressive, you are not going to make money, and if you are not defensive, you are not going to keep money.” — Ray Dalio
