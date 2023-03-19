import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Container,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import LockIcon from "@mui/icons-material/Lock";
import CourseDetails from "./elements/CourseDetails";
import { useTitle } from "../../hooks";
import useIsLessonExists from "./hooks/useIsLessonExists";
import useRedirectToFirstLesson from "./hooks/useRedirectToFirstLesson";
import useCurrentLesson from "./hooks/useCurrentLesson";
import useVideo from "./hooks/useVideo";
import { getLessons } from "../../services/fetch/lessons";
import LessonImageBuilder from "../../services/lessonImageBuilder";

function GetVideoProgress() {
  const videoProgress = localStorage.getItem("videoProgress");
  return JSON.parse(videoProgress);
}

function LessonPage() {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lessonId, setLessonId] = useState(searchParams.get("lessonId"));
  const [currentLesson, setCurrentLesson] = useState();
  const [videoTimeProgress, setVideoTimeProgress] = useState(
    GetVideoProgress()
  );

  const queryOptions = {
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    cacheTime: 0,
  };

  const { data, isLoading, isError, isSuccess, error } = useQuery(
    "lessons",
    () => getLessons(courseId),
    queryOptions
  );

  function changeLesson(id) {
    searchParams.set("lessonId", id);
    setSearchParams(searchParams);
    setLessonId(id);
  }

  function isLessonExists(course) {
    // eslint-disable-next-line
    return course?.lessons?.find((lesson) => lesson.id === lessonId)
      ? true
      : false;
  }

  const isLessonExistsError = useIsLessonExists({
    isSuccess,
    data,
    searchParams,
    isLessonExists,
  });
  useRedirectToFirstLesson({ isSuccess, searchParams, changeLesson, data });
  useTitle(currentLesson ? currentLesson.title : "Loading");
  useCurrentLesson({
    data,
    searchParams,
    setCurrentLesson,
    lessonId,
  });
  const { videoRef, isLessonError, errorMsg } = useVideo({
    lessonId,
    currentLesson,
  });
  const video = videoRef.current;
  useEffect(() => {
    if (!currentLesson) return;

    const progress = GetVideoProgress();

    if (!progress) {
      const dataString = JSON.stringify([
        {
          time: videoTimeProgress,
          lessonId: currentLesson.id,
        },
      ]);
      localStorage.setItem("videoProgress", dataString);
      return;
    }
    const currentProgress = progress.find(
      (lesson) => lesson.id === currentLesson.id
    );
    if (currentProgress) {
      currentProgress.time = videoTimeProgress;
      currentProgress.lessonId = currentLesson.id;

      const dataString = JSON.stringify(currentProgress);
      localStorage.setItem("videoProgress", dataString);
    } else {
      progress.push({
        time: videoTimeProgress,
        lessonId: currentLesson.id,
      });
      const dataString = JSON.stringify(progress);
      localStorage.setItem("videoProgress", dataString);
    }
  }, [videoTimeProgress]);

  if (isLessonError) {
    return (
      <Container>
        <Typography variant="h2" component="span" color={red[700]}>
          Error!
        </Typography>
        <Typography variant="body1">Error message: {errorMsg}</Typography>
      </Container>
    );
  }

  if (isLessonExistsError) {
    return (
      <Container>
        <Typography variant="h2" component="span" color={red[700]}>
          Error!
        </Typography>
        <Typography variant="body1">
          Error message: {isLessonExistsError}
        </Typography>
      </Container>
    );
  }

  if (isError) {
    <>
      <Typography variant="h2" component="span" color={red[700]}>
        Error!
      </Typography>
      <Typography variant="body1">Error code: {error.code}</Typography>
      <Typography variant="body1">Error message: {error.message}</Typography>
    </>;
  }

  function SaveVideoProgress() {
    setVideoTimeProgress(video.currentTime);
  }

  return (
    <Box>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          {isLoading ? (
            <Skeleton
              sx={{ bgcolor: "grey.400", width: "100%", height: "300px" }}
              variant="rectangular"
            />
          ) : (
            <video
              ref={videoRef}
              controls
              poster={LessonImageBuilder(
                currentLesson?.previewImageLink,
                currentLesson?.order
              )}
              style={{ width: "100%" }}
              onPause={SaveVideoProgress}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {isLoading ? (
            <Skeleton
              sx={{ bgcolor: "grey.400", width: "100%", height: "300px" }}
              variant="rectangular"
            />
          ) : (
            <nav>
              <List>
                {data?.lessons.map((lesson, index) => (
                  <ListItem key={lesson.id}>
                    <ListItemButton
                      disabled={lesson.status === "locked"}
                      onClick={() => changeLesson(lesson.id)}
                      sx={
                        lessonId === lesson.id
                          ? {
                              backgroundColor: "primary.main",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <ListItemText primary={`${index + 1}. ${lesson.title}`} />
                      {lesson.status === "locked" && (
                        <ListItemIcon>
                          <LockIcon />
                        </ListItemIcon>
                      )}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <CourseDetails {...data} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Box>
  );
}
export default LessonPage;
