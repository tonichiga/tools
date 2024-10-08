import { useRef, useState } from "react";
import uuid from "react-uuid";

interface IUseLoadedProps {
  defaultLoadingState?: boolean;
  enableTimeout?: boolean;
}

const useLoaded = (props: IUseLoadedProps) => {
  const [isLoading, setIsLoading] = useState(
    props?.defaultLoadingState || false
  );
  const timeout = useRef(null);

  const emitFetching = (callback) => {
    setIsLoading(true);
    callback?.(uuid());

    if (!props.enableTimeout) return;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const emitLoaded = (callback) => {
    setIsLoading(false);
    callback?.(uuid());
    clearTimeout(timeout.current);
  };

  return {
    emitFetching,
    emitLoaded,
    isLoading,
  };
};

export default useLoaded;
