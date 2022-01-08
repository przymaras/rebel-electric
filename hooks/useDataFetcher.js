import { useEffect, useState } from "react";

function useDataFetcher(url) {
  const [data, setData] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    async function getData(fetchUrl) {
      try {
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const data = await res.json();
          setData(data);
          setIsAvailable(true);
        } else throw Error("Error while fetching data...");
      } catch (err) {
        console.error(err.message);
      }
    }

    if (url) {
      setIsAvailable(false);
      getData(url);
    }
  }, [url]);

  return [data, isAvailable];
}

export { useDataFetcher };
