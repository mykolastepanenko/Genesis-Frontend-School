import { Routes, Route, Navigate } from "react-router-dom";
import { CoursePage, LessonPage, Layout, NoMatchPage } from "./pages/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/courses" replace />} />
        <Route path="/courses">
          <Route index element={<CoursePage />} />
          <Route path="/courses/:courseId/lessons" element={<LessonPage />} />
        </Route>
        <Route path="*" element={<NoMatchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
