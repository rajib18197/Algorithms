import { createContext, useEffect, useState } from "react";

const QueryContext = createContext([{}, () => {}]);
const requestMemoize = {};

export default function QueryProvider({ children }) {
  const tuple = useState({});
  return (
    <QueryContext.Provider value={tuple}>{children}</QueryContext.Provider>
  );
}

export function useQuery({ queryKey, queryFn }) {
  const [state, setState] = useState({
    [queryKey[0]]: { data: null, isLoading: true, isError: false, error: null },
  });

  console.log(state[queryKey[0]]);
  // console.log(QueryContext[queryKey[0]]);

  useEffect(() => {
    const update = (newState) =>
      setState((prev) => ({
        ...prev,
        [queryKey[0]]: { ...prev[queryKey[0]], ...newState },
      }));

    // if (requestMemoize[queryKey[0]]) {
    //   update(requestMemoize[queryKey[0]]);
    //   return;
    // }

    let ignore = false;
    requestMemoize[queryKey[0]] = state;

    async function fetchData() {
      console.log(queryKey[1]);

      update({
        data: undefined,
        isLoading: true,
        error: null,
        isError: false,
      });

      try {
        console.log(state[queryKey[0]]);

        const data = await queryFn();
        if (ignore) return;

        update({
          data,
          isLoading: false,
          error: null,
          isError: false,
        });
      } catch (err) {
        console.error(err, 10111);
        update({
          data: null,
          isLoading: false,
          error: err,
          isError: true,
        });
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [queryKey[0]]);

  return state[queryKey[0]];
}
