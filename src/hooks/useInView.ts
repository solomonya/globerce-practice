import React, { useState, useMemo, useEffect } from 'react';
import TIntersectionObserverOptions from '../@types/intersectionObserverOptions';

const useInView = (options: TIntersectionObserverOptions, targetRef: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const setVisible = (entries: any) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(setVisible, optionsMemo);
    const currentTarget = targetRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [targetRef, optionsMemo]);

  return isVisible;
};

export default useInView;
