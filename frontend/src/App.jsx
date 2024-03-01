// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import StudentsList from "./components/StudentsList";
import RegisterStudentAccount from "./components/RegisterStudentAccount";
import ViewStudent from "./components/ViewStudent";
import EditStudent from "./components/EditStudent";
import CoursesList from "./components/CoursesList";
import CreateCourse from "./components/CreateCourse";
import CreatePrequisite from "./components/CreatePrequisite";
import PrequisitesList from "./components/PrequisitesList";
import EditCourse from "./components/EditCourse";
import EditPrequisite from "./components/EditPrequisite";
import RegisterSubAdminAccount from "./components/RegisterSubAdminAccount";
import SubadminsList from "./components/SubadminsList";
import ViewSubadmin from "./components/ViewSubadmin";
import EditSubadmin from "./components/EditSubadmin";
import ViewStudentGrade from "./components/ViewStudentGrade";
import RegisterStudentGrade from "./components/RegisterStudentGrade";
import EditStudentGrade from "./components/EditStudentGrade";

import UserPanel from "./components/UserPanel";
import LoginForm from "./components/LoginForm";
import PasswordChangeForm from "./components/PasswordChangeForm";
import Logout from "./components/Logout";
import ViewStudentYear from "./components/ViewStudentYear";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      {/* <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}
      <Route path="/" element={<UserPanel />} />
      <Route path="/students/view" element={<StudentsList />} />
      <Route path="/students/create" element={<RegisterStudentAccount />} />
      <Route path="/students/view/:id" element={<ViewStudent />} />
      <Route path="/students/edit/:id" element={<EditStudent />} />
      <Route path="/students/year/:year" element={<ViewStudentYear />} />
      <Route path="/courses/view" element={<CoursesList />} />
      <Route path="/courses/create" element={<CreateCourse />} />
      <Route path="/courses/edit/:id" element={<EditCourse />} />
      <Route path="/prequisites/create" element={<CreatePrequisite />} />
      <Route path="/prequisites/view" element={<PrequisitesList />} />
      <Route path="/prequisites/edit/:id" element={<EditPrequisite />} />
      <Route path="/subadmins/view" element={<SubadminsList />} />
      <Route path="/subadmins/create" element={<RegisterSubAdminAccount />} />
      <Route path="/subadmins/view/:id" element={<ViewSubadmin />} />
      <Route path="/subadmins/edit/:id" element={<EditSubadmin />} />
      <Route path="/students/grade/:id" element={<ViewStudentGrade />} />
      <Route path="/grades/create/:id/:year" element={<RegisterStudentGrade />} />
      <Route path="/grades/edit/:id" element={<EditStudentGrade />} />


      <Route path="/users/login" element={<LoginForm />} />
      <Route path="/users/changePassword" element={<PasswordChangeForm />} />
      <Route path="/users/logout" element={<Logout />} />


    </Routes>
  );
}

export default App;

