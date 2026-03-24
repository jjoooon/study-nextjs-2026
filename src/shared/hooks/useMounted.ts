import { useEffect } from 'react';

const useMounted = (mounted: () => void, unmounted?: () => void) => {
  useEffect(() => {
    mounted();

    return () => {
      if (unmounted) {
        unmounted();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMounted;
