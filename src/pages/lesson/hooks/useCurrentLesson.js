import { useEffect } from "react";

export default function useCurrentLesson({
  data,
  searchParams,
  setCurrentLesson,
  lessonId,
}) {
  function getCurrentLesson(course) {
    const curLesson = course?.lessons?.find((lesson) => lesson.id === lessonId);
    return curLesson;
  }

  useEffect(() => {
    if (data) {
      setCurrentLesson(getCurrentLesson(data));
    }
  }, [searchParams, lessonId, data]);
}
