import { createContext, useContext, useEffect, useState } from "react";

const QueryContext = createContext();

export default function QueryProvider({ children, client }) {
  return (
    <QueryContext.Provider value={client}>{children}</QueryContext.Provider>
  );
}

export function useQuery({ queryKey, queryFn }) {
  const [_isRun, setIsRun] = useState(false);
  const serverCache = useContext(QueryContext);

  useEffect(() => {
    console.log("j");
    const update = () => setIsRun((prev) => !prev);
    let ignore = false;
    serverCache.subscribe({ fn: update, key: queryKey[0] });

    if (serverCache.cache[queryKey[0]]) {
      console.log("cached");
      return;
    }

    async function fetchData() {
      serverCache.cache[queryKey[0]] = {
        ...serverCache.cache[queryKey[0]],
        data: undefined,
        isLoading: true,
        error: null,
        isError: false,
      };

      try {
        const data = await queryFn();
        if (ignore) return;

        serverCache.cache[queryKey[0]] = {
          ...serverCache.cache[queryKey[0]],
          data,
          isLoading: false,
          error: null,
          isError: false,
        };
        serverCache.notify(queryKey[0]);
      } catch (err) {
        console.error(err, 10111);
        serverCache.cache[queryKey[0]] = {
          data: null,
          isLoading: false,
          error: err,
          isError: true,
        };
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [...queryKey]);

  return (
    serverCache.cache[queryKey[0]] || {
      data: undefined,
      isLoading: true,
      isError: false,
    }
  );
}
