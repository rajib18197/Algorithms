import { createContext, useContext, useEffect, useState } from "react";

const QueryContext = createContext();

export default function QueryProvider({ children, client }) {
  const [isRun, setIsRun] = useState(false);

  return (
    <QueryContext.Provider value={{ client: client, isRun, setIsRun }}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery({ queryKey, queryFn }) {
  const serverCache = useContext(QueryContext);
  // console.log(serverCache);

  useEffect(() => {
    console.log("j");

    let ignore = false;
    if (serverCache.client.cache[queryKey[0]]) {
      console.log("cached");

      return;
    }

    async function fetchData() {
      serverCache.client.cache[queryKey[0]] = {
        ...serverCache.client.cache[queryKey[0]],
        data: undefined,
        isLoading: true,
        error: null,
        isError: false,
      };

      try {
        const data = await queryFn();
        if (ignore) return;

        serverCache.client.cache[queryKey[0]] = {
          ...serverCache.client.cache[queryKey[0]],
          data,
          isLoading: false,
          error: null,
          isError: false,
        };

        serverCache.setIsRun((val) => !val);
      } catch (err) {
        console.error(err, 10111);
        serverCache.client.cache[queryKey[0]] = {
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
    serverCache.client.cache[queryKey[0]] || {
      data: undefined,
      isLoading: true,
      isError: false,
    }
  );
}
