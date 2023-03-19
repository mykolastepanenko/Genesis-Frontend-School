import { useEffect } from "react";

export default function useCoursesPerPage({
  courses,
  currentPage,
  ITEMS_PER_PAGE,
  setCoursesPerPage,
}) {
  useEffect(() => {
    if (courses) {
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = currentPage * ITEMS_PER_PAGE;

      const coursesPerPage = courses.slice(start, end);

      setCoursesPerPage(coursesPerPage);
    }
  }, [courses, currentPage]);
}
