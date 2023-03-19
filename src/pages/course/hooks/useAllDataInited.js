import { useEffect } from "react";

export default function useAllDataInited({ pageCount, setIsAllDataInited }) {
  useEffect(() => {
    if (pageCount) {
      setIsAllDataInited(true);
    }
  }, [pageCount]);
}
