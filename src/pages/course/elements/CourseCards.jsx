import { Grid, Skeleton } from "@mui/material";
import CourseCard from "./CourseCard";

function CourseCards({ courses }) {
  const skeletonContent = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];

  const skeletonElem = (
    <Skeleton
      sx={{ bgcolor: "grey.400", width: "100%", height: "300px" }}
      variant="rectangular"
    />
  );

  function courseCardInit() {
    if (courses) {
      return courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ));
    }
    return skeletonContent.map((item) => (
      <CourseCard key={item.id} skeletonElem={skeletonElem} />
    ));
  }

  const Content = () => courseCardInit();

  return (
    <Grid container spacing={2}>
      <Content />
    </Grid>
  );
}
export default CourseCards;
