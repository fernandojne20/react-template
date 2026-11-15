import { useEffect, useRef } from 'react';

type InfiniteScrollTriggerProps = {
  onIntersect: () => void;
  disabled: boolean;
};
export const InfiniteScrollTrigger = ({
  onIntersect,
  disabled,
}: InfiniteScrollTriggerProps) => {
  const ref = useRef(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: '0px',
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersect, disabled]);

  return <div ref={ref}></div>;
};
