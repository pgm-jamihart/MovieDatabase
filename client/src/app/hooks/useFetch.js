import {useEffect, useState} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [url]);

    const getData = async () => {
      try {
          const response = await fetch(url);
          if (!response.ok) {
              setError('There went something wrong, ara you sure the API link is right?');
          }

          const json = await response.json();
          setData(json);
      } catch(err) {
          setError(err)
      } finally {
          setIsLoading(false);
      }
  }

    return [data, error, isLoading];
};

export default useFetch;