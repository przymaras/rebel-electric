import { useEffect, useState } from 'react';

export const useDataFetcher: <T>(url: string) => [T[], boolean] = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    async function getData(fetchUrl: string) {
      try {
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const fetchedData = (await res.json()) as T[];
          setData(fetchedData);
          setIsAvailable(true);
        } else throw Error('Error while fetching data...');
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log('Unexpected error', err);
        }
      }
    }

    if (url) {
      setIsAvailable(false);
      void getData(url);
    }
  }, [url]);

  return [data, isAvailable];
};
