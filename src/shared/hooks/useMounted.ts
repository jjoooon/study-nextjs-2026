/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useEffect } from 'react';

function useMounted(mounted: () => void, unmounted?: () => void) {
  // eslint-disable-next-line no-restricted-syntax
  useEffect(() => {
    mounted();

    return () => {
      if (unmounted) {
        unmounted();
      }
    };
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mounted;
}

export default useMounted;
