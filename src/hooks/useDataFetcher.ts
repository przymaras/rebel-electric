import { useEffect, useState } from 'react';

const useDataFetcher: (url: string) => [any[], boolean] = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    async function getData(fetchUrl: string) {
      try {
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const data = await res.json();
          setData(data);
          setIsAvailable(true);
        } else throw Error('Error while fetching data...');
      } catch (err: any) {
        console.error(err.message);
      }
    }

    if (url) {
      setIsAvailable(false);
      getData(url);
    }
  }, [url]);

  return [data, isAvailable];
};

export { useDataFetcher };
