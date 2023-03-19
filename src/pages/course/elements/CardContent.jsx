import styled from "@emotion/styled";
import {
  CardActionArea,
  Typography,
  CardMedia,
  CardContent as MUICardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import CourseImageBuilder from "../../../services/courseImageBuilder";

function MyTypography({ className, children }) {
  return (
    <Typography className={className} gutterBottom variant="h5" component="h2">
      {children}
    </Typography>
  );
}

function CardContent({ course }) {
  let skills;
  if (course) {
    skills = course.meta.skills;
  }

  const cardTextProps = {
    variant: "body1",
    color: "text.primary",
    textAlign: "left",
  };

  const Title = styled(MyTypography)`
    min-height: calc(2em * 1.334);
  `;

  return (
    <CardActionArea
      component={Link}
      to={`/courses/${course.id}/lessons`}
      sx={{ height: "100%" }}
    >
      <CardMedia
        component="img"
        image={CourseImageBuilder(course.previewImageLink)}
        alt=""
      />
      <MUICardContent>
        <Title>{course.title}</Title>
        <Typography {...cardTextProps}>
          Lessons: {course.lessonsCount}
        </Typography>
        <Typography {...cardTextProps}>Rating: {course.rating}</Typography>
        {skills && (
          <Typography {...cardTextProps}>
            Skills: {skills.join(", ")}
          </Typography>
        )}
      </MUICardContent>
    </CardActionArea>
  );
}

export default CardContent;
