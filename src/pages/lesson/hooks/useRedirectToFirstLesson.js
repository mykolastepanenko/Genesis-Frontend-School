import { useEffect } from "react";

export default function useRedirectToFirstLesson({
  isSuccess,
  searchParams,
  changeLesson,
  data
}) {
  useEffect(() => {
    if (data) {
      const hasParam = searchParams.has("lessonId");
      const emptyParam = !searchParams.get("lessonId");
      if (!hasParam || emptyParam) {
        changeLesson(data?.lessons[0].id);
      } else {
        changeLesson(searchParams.get("lessonId"));
      }
    }
  }, [isSuccess]);
}
