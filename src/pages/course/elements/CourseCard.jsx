import { Card, Grid } from "@mui/material";
import CardContent from "./CardContent";

function CourseCard({ course, skeletonElem }) {
  const cardProps = {
    sx: {
      maxWidth: "100%",
      mx: "auto",
      height: "100%",
    },
  };

  return (
    <Grid item xs={12} md={6} pr={1}>
      <Card {...cardProps}>
        {skeletonElem && skeletonElem}
        {course && <CardContent course={course} />}
      </Card>
    </Grid>
  );
}
export default CourseCard;
