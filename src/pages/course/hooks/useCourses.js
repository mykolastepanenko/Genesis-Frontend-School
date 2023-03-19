import { useEffect } from "react";

export default function useCourses({ data, setCourses }) {
  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }
  }, [data]);
}
