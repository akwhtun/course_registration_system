import { Routes, Route, Navigate } from "react-router-dom";
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
import RegisterSuccessful from "./components/RegisterSuccessful";
import RegistrationsList from "./components/RegistrationsList";
import UserPanel from "./components/UserPanel";
import LoginForm from "./components/LoginForm";
import PasswordChangeForm from "./components/PasswordChangeForm";
import Logout from "./components/Logout";
import ViewStudentYear from "./components/ViewStudentYear";
import CourseRegistration from "./components/CourseRegistration";
import ViewCourseRegistration from "./components/ViewCourseRegistration";
import ViewRegistrationHistory from "./components/ViewRegistrationHistory";
import ViewProfile from "./components/ViewProfile";
import AccessDeniedPage from "./components/AccessDeniedPage";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import AdminProfile from "./components/AdminProfile";
import AdminPasswordChange from "./components/AdminPasswordChange";
import AdminLogout from "./components/AdminLogout";
import PrivateRoutes from "./Auth/PrivateRoutes";
import AuthRoutes from "./Auth/AuthRoutes";
import About from "./components/About";

function App() {
  return (
    <Routes>
      {/* all user before lognin */}
      <Route path="/" element={<UserPanel />} />

      {/* only can admin access */}

      <Route
        path="/students/view"
        element={
          <PrivateRoutes role="admin">
            <StudentsList />
          </PrivateRoutes>
        }
      />

      <Route
        path="/students/create"
        element={
          <PrivateRoutes role="admin">
            <RegisterStudentAccount />
          </PrivateRoutes>
        }
      />

      <Route path="/students/view/:id" element={<PrivateRoutes role="admin"><ViewStudent /> </PrivateRoutes>} />
      <Route path="/students/edit/:id" element={<PrivateRoutes role="admin"><EditStudent /> </PrivateRoutes>} />
      <Route path="/students/year/:year" element={<PrivateRoutes role="admin"><ViewStudentYear /> </PrivateRoutes>} />
      <Route path="/courses/view" element={<PrivateRoutes role="admin"><CoursesList /> </PrivateRoutes>} />
      <Route path="/courses/create" element={<PrivateRoutes role="admin"><CreateCourse /> </PrivateRoutes>} />
      <Route path="/courses/edit/:id" element={<PrivateRoutes role="admin"><EditCourse /> </PrivateRoutes>} />
      <Route path="/prequisites/create" element={<PrivateRoutes role="admin"><CreatePrequisite /> </PrivateRoutes>} />
      <Route path="/prequisites/view" element={<PrivateRoutes role="admin"><PrequisitesList /> </PrivateRoutes>} />
      <Route path="/prequisites/edit/:id" element={<PrivateRoutes role="admin"><EditPrequisite /> </PrivateRoutes>} />
      <Route path="/subadmins/view" element={<PrivateRoutes role="admin"><SubadminsList /> </PrivateRoutes>} />
      <Route path="/subadmins/create" element={<PrivateRoutes role="admin"><RegisterSubAdminAccount /> </PrivateRoutes>} />
      <Route path="/subadmins/view/:id" element={<PrivateRoutes role="admin"><ViewSubadmin /> </PrivateRoutes>} />
      <Route path="/subadmins/edit/:id" element={<PrivateRoutes role="admin"><EditSubadmin /> </PrivateRoutes>} />
      <Route path="/students/grade/:id" element={<PrivateRoutes role="admin"><ViewStudentGrade /> </PrivateRoutes>} />
      <Route path="/grades/create/:id/:year" element={<PrivateRoutes role="admin"><RegisterStudentGrade /> </PrivateRoutes>} />
      <Route path="/grades/edit/:id" element={<PrivateRoutes role="admin"><EditStudentGrade /> </PrivateRoutes>} />
      <Route path="/course_registration/view" element={<PrivateRoutes role="admin"><RegistrationsList /></PrivateRoutes>} />
      <Route path="/course_registration/view/:id/:semester" element={<PrivateRoutes role="admin"><ViewCourseRegistration /> </PrivateRoutes>} />

      <Route path="/admin/profile" element={<PrivateRoutes role="admin"><AdminProfile /> </PrivateRoutes>} />

      <Route path="/dashboard" element={<PrivateRoutes role="admin"><Dashboard /> </PrivateRoutes>} />

      <Route path="/admin/logout" element={<PrivateRoutes role="admin"><AdminLogout /> </PrivateRoutes>} />

      <Route path="/admin/changePassword" element={<PrivateRoutes role="admin"><AdminPasswordChange /> </PrivateRoutes>} />

      {/* student user access pages */}

      <Route path="/students/course_register" element={<PrivateRoutes role="student">
        <CourseRegistration />
      </PrivateRoutes>} />
      <Route path="/students/registration_history" element={<PrivateRoutes role="student"><ViewRegistrationHistory /></PrivateRoutes>} />
      <Route path="/students/success_register" element={<PrivateRoutes role="student"><RegisterSuccessful /></PrivateRoutes>} />
      <Route path="/course_registration/view/:id" element={<PrivateRoutes role="student"><ViewCourseRegistration /></PrivateRoutes>} />
      <Route path="/users/profile" element={<PrivateRoutes role="student">
      <ViewProfile />
      </PrivateRoutes>} />
      <Route path="/users/changePassword" element={<PrivateRoutes role="student"><PasswordChangeForm /></PrivateRoutes>} />
      <Route path="/users/logout" element={<PrivateRoutes role="student"><Logout /></PrivateRoutes>} />

      <Route
        path="/users/login"
        element={<AuthRoutes><LoginForm /></AuthRoutes>}
      />
      

      {/* access denied page */}
      <Route path="/access_denied" element={<AccessDeniedPage />} />

      {/* not found page */}
      <Route path="*" element={<NotFound />} />

      {/* public page */}
      <Route path="/users/about" element={<About />} />
    </Routes>
  );
}

export default App;

