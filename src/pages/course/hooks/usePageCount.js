import { useEffect } from "react";

export default function usePageCount({
  coursesPerPage,
  setPageCount,
  ITEMS_PER_PAGE,
  courses,
}) {
  useEffect(() => {
    if (coursesPerPage) {
      setPageCount(Math.ceil(courses.length / ITEMS_PER_PAGE));
    }
  }, [coursesPerPage]);
}
