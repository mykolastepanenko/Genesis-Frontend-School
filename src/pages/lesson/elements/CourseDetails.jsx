import { Box, Typography, Skeleton } from "@mui/material";

function CourseDetails({ title, lessons, rating, description, isLoading }) {
  return (
    <Box sx={{ p: 1 }}>
      {isLoading ? (
        <Skeleton
          sx={{ bgcolor: "grey.400", width: "100%" }}
          variant="rectangular"
        />
      ) : (
        <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
          About this course
        </Typography>
      )}

      <Box>
        {isLoading ? (
          <Skeleton
            sx={{ bgcolor: "grey.400", width: "100%", marginTop: 1 }}
            variant="rectangular"
          />
        ) : (
          <Typography variant="body1" sx={{ display: "inline" }}>
            Title:{" "}
          </Typography>
        )}

        {isLoading ? (
          <Skeleton
            sx={{ bgcolor: "grey.400", width: "100%", marginTop: 1 }}
            variant="rectangular"
          />
        ) : (
          <Typography variant="body1" component="h1" sx={{ display: "inline" }}>
            {title}
          </Typography>
        )}
      </Box>

      {isLoading ? (
        <Skeleton
          sx={{ bgcolor: "grey.400", width: "100%", marginTop: 1 }}
          variant="rectangular"
        />
      ) : (
        <Typography>Lessons: {lessons.length}</Typography>
      )}

      {isLoading ? (
        <Skeleton
          sx={{ bgcolor: "grey.400", width: "100%", marginTop: 1 }}
          variant="rectangular"
        />
      ) : (
        <Typography>Rating: {rating}</Typography>
      )}
      {isLoading ? (
        <Skeleton
          sx={{ bgcolor: "grey.400", width: "100%", marginTop: 1 }}
          variant="rectangular"
        />
      ) : (
        <Typography>Description: {description}</Typography>
      )}
    </Box>
  );
}
export default CourseDetails;
