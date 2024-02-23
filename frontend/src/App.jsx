// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import  StudentsList  from "./components/StudentsList";
import RegisterStudentAccount from "./components/RegisterStudentAccount"; 
import ViewStudent from "./components/ViewStudent";
import EditStudent from "./components/EditStudent";
import CoursesList from "./components/CoursesList";
import CreateCourse from "./components/CreateCourse";
import EditCourse from "./components/EditCourse";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/students/view" element={<StudentsList />} />
      <Route path="/students/create" element={<RegisterStudentAccount />} />
      <Route path="/students/view/:id" element={<ViewStudent />} />
      {/* <Route path="/students/edit/:id" element={<EditStudent />} /> */}
      <Route path="/students/edit/:id" element={<EditStudent />} />
      <Route path="/courses/view" element={<CoursesList />} />
      <Route path="/courses/create" element={<CreateCourse />} />
       <Route path="/courses/edit/:id" element={<EditCourse />} />
    </Routes>
  );
}

export default App;

