import { Typography } from "@mui/material";
import { useState } from "react";
import CourseCards from "./CourseCards";
import Pagination from "./Pagination";
import { useCourses, useCoursesPerPage, usePageCount } from "../hooks";

function Content({ data }) {
  const [courses, setCourses] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState();
  const [pageCount, setPageCount] = useState();

  const ITEMS_PER_PAGE = process.env.REACT_APP_COURSES_PER_PAGE ?? 10;

  const coursesHookArgs = { data, setCourses };
  const coursesPerPageHookArgs = {
    courses,
    currentPage,
    ITEMS_PER_PAGE,
    setCoursesPerPage,
  };
  const pageCountHookArgs = {
    courses,
    coursesPerPage,
    setPageCount,
    ITEMS_PER_PAGE,
  };

  useCourses(coursesHookArgs);
  useCoursesPerPage(coursesPerPageHookArgs);
  usePageCount(pageCountHookArgs);

  const changePageHandler = (e, value) => setCurrentPage(value);
  return (
    <>
      <Typography variant="h2" component="h1" align="center" sx={{ mb: 3 }}>
        Your courses
      </Typography>
      <CourseCards courses={coursesPerPage} />
      <Pagination count={pageCount} changePageHandler={changePageHandler} />
    </>
  );
}
export default Content;
