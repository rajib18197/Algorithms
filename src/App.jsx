import { useQuery } from "./hooks/QueryProvider";
import { wait } from "./services/apiCabins";

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => wait(3000),
  });

  if (isLoading) return <h2>Loading App</h2>;
  return <div>{data.length}</div>;
}

export function Test() {
  console.log(Math.random());

  return <div>Test {Math.random()}</div>;
}

export function CabinTable() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => wait(3000),
  });
  if (isLoading) return <h2>Loading App</h2>;

  return <div>{data.length}</div>;
}

export default App;
