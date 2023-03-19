import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export default function useVideo({ lessonId, currentLesson }) {
  const videoRef = useRef();
  const video = videoRef.current;
  const [isLessonError, setIsLessonError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    if (currentLesson) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        if (!currentLesson?.link) {
          setIsLessonError(true);
          setErrorMsg("LINK FOR VIDEO DOESN'T EXISTS IN RESPONSE");
          return;
        }
        const videoSource = currentLesson?.link;
        hls.loadSource(videoSource);
        hls.attachMedia(video);
      } else {
        setIsLessonError(true);
        setErrorMsg("HLS VIDEO DOESN'T SUPPORT");
      }
    }
  }, [currentLesson, lessonId, video]);

  return { videoRef, isLessonError, errorMsg };
}
