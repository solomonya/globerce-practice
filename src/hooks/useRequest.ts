import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useInView from './useInView';

function useRequest<T>(URL: string, targetRef: any) {
  let isVisible = useInView(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
    targetRef
  );

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isVisible && !data) {
      axios
        .get<T>(URL)
        .then((response) => response.data)
        .then((data) => setData(data))
        .catch((e) => setError(e))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isVisible, data]);

  return { loading, data, error };
}

export default useRequest;
