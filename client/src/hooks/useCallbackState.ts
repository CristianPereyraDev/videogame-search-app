import { useEffect, useRef, useState } from 'react';

export default function useCallbackState<S>(
  initialValue: S
): [S, (newValue: S, callback: (state: S) => void) => void] {
  const [state, _setState] = useState(initialValue);
  const callbackQueue = useRef<Array<(state: S) => void>>([]);

  useEffect(() => {
    callbackQueue.current.forEach((cb) => cb(state));
    callbackQueue.current = [];
  }, [state]);

  const setState = (newValue: S, callback: (state: S) => void) => {
    _setState(newValue);

    if (callback && typeof callback === 'function') {
      callbackQueue.current.push(callback);
    }
  };

  return [state, setState];
}
