import { useEffect, useState } from "react";

export default function useIsLessonExists({
  isSuccess,
  data,
  searchParams,
  isLessonExists,
}) {
  const [isLessonExistsError, setIsLessonExistsError] = useState();

  useEffect(() => {
    if (data) {
      const emptyParam = !searchParams.get("lessonId");
      if (!emptyParam && !isLessonExists(data))
        setIsLessonExistsError("THIS LESSON DOESN'T EXISTS");
      // throw new Error("THIS LESSON DOESN'T EXISTS");
    }
  }, [isSuccess]);

  return isLessonExistsError;
}
