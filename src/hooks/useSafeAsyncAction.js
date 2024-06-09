import { useCallback } from 'react';

import useIsMounted from './useIsMounted';

export default function useSafeAsyncStateAction() {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback(
    (callback) => {
      if (isMounted()) {
        callback();
      }
    },
    [isMounted],
  );

  return runSafeAsyncAction;
}
