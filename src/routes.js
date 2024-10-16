import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/MainLayout/Layout";
import SessionTimeoutModal from "./components/MainLayout/SessionTimeoutModal";
import MainLayout from "./components/MainLayout/index";
import NonAuthLayout from './components/MainLayout/nonAuthLayout';
import BackToHomeErrorPage from "./components/Pages/BackToHomeErrorPage";
import BackToSignInErrorPage from "./components/Pages/BackToSIgninErrorPage";

// auth
import { loginRoles } from "./_mock/helperIndex";
import AuthManagerForSignInAndReg from "./components/Auth/AuthManager";
import PrivaycPolicy from "./components/Auth/Registeration/PrivacyPolicy";

// non-auth components (no lazy loading)
import Ablation from "./components/Pages/Ablation";
import About from "./components/Pages/About";
import ACO from "./components/Pages/Aco";
import Affaq from "./components/Pages/Affaq";
import Alcohol from "./components/Pages/Alcohol";
import Appointments from "./components/Pages/Appointments";
import CommunityResources from "./components/Pages/CommunityResources";
import Congestive from "./components/Pages/Congestive";
import ContactUs from "./components/Pages/ContactUs";
import Coronary from "./components/Pages/Coronary";
import DevicePacemaker from "./components/Pages/DevicePacemaker";
import Dietician from "./components/Pages/Dietician";
import EcoPharmacy from "./components/Pages/EcoPharmacy";
import Exercise from "./components/Pages/Exercise";
import HealthPlan from "./components/Pages/HealthPlan";
import HealthcareConsultant from "./components/Pages/HealthcareConsultant";
import HeartValves from "./components/Pages/HeartValves";
import HomeEducationalBot from "./components/Pages/HomeEducationalBot";
import Medications from "./components/Pages/Medications";
import Obesity from "./components/Pages/Obesity";
import Personomics from "./components/Pages/Personomics";
import Pharmacy from "./components/Pages/Pharmacy";
import RateControl from "./components/Pages/RateControl";
import RhythmControl from "./components/Pages/RhythmControl";
import Sleepapnea from "./components/Pages/Sleepapnea";
import Smoking from "./components/Pages/Smoking";
import StrokeRisk from "./components/Pages/StrokeRisk";
import Symptoms from "./components/Pages/Symptoms";
import TermsAndConditionExternal from "./components/Pages/TermsAndConditionExternal";
import Vascular from "./components/Pages/Vascular";

// Patient auth-user
const Home = React.lazy(() => import("./components/InnerApp/Home/HomeManager"));
const Profile = React.lazy(() => import("./components/InnerApp/Profile/ProfileManager"));
const Dashboard = React.lazy(() => import("./components/InnerApp/Dashboard/Dashboard"));
const HistorySummary = React.lazy(() => import("./components/InnerApp/HistorySummary/HistorySummary"));
const HistoryChat = React.lazy(() => import("./components/InnerApp/HistoryChatBot/HistoryChatBot"));
const BehavioralChat = React.lazy(() => import("./components/InnerApp/BehaviouralChatBot/BehaviouralChatBot"));

// Admin
const ListofPatients = React.lazy(() => import("./components/Admin/ListofPatients/index"));
const ApproveUsers = React.lazy(() => import("./components/Admin/ApproveUsers/ApproveUsersManager"));
const UploadDocument = React.lazy(() => import("./components/Admin/UploadDocument/UploadDocumentManager"));
const AdminEducationBot = React.lazy(() => import("./components/Admin/EducationBot/AdminEducationalBotManager"));

const BotQuestionnaire = React.lazy(() => import("./components/Admin/BotQuestionnaire/index"));
const DoctorsList = React.lazy(() => import("./components/InnerApp/DoctorsList/index"));
const RoleManagement = React.lazy(() => import("./components/Admin/RoleManagement/index"));
const UserManagement = React.lazy(() => import("./components/Admin/UserManagement/index"));
const HealthHubBuilder = React.lazy(() => import("./components/Admin/HealthHubBuilder/index"));
const UserFeedback = React.lazy(() => import("./components/Admin/UserFeedback/index"));

// SuperAdmin
const AdminCreation = React.lazy(() => import("./components/SuperAdmin/AdminCreation/AdminCreationManager"));

const AllRoutes = ({ authenticated }) => {

  let { isAuthenticated, role } = authenticated;

  return (
    <>
      <ToastContainer theme="light" />
      <SessionTimeoutModal />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<MainLayout />}>
              {role === loginRoles.PATIENT &&
                <>
                  <Route index path="/" element={<Home />} />
                  <Route path="home" element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="chat" element={<BehavioralChat />} />
                  <Route path="historychat" element={<HistoryChat />} />
                  <Route path="transcriptsummary" element={<HistorySummary />} />
                </>
              }
              {role === loginRoles.SUPERADMIN &&
                <>
                  <Route index path="/" element={<AdminCreation />} />
                  <Route path="admincreation" element={<AdminCreation />} />
                </>}
              {role === loginRoles.ADMIN &&
                <>
                  <Route index path="/" element={<ApproveUsers />} />
                  <Route path="approveusers" element={<ApproveUsers />} />
                  <Route path="uploaddocument" element={<UploadDocument />} />
                  <Route path="educationbot" element={<AdminEducationBot />} />
                </>}
              <Route path="profile" element={<Profile />} />
              <Route path="botquestionnaire" element={<BotQuestionnaire />} />
              <Route path="patientslist" element={<ListofPatients />} />
              <Route path="doctorslist" element={<DoctorsList />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="roles" element={<RoleManagement />} />
              <Route path="healthhubbuilder" element={<HealthHubBuilder />} />
              <Route path="userFeedback" element={<UserFeedback />} />
            </Route>
            <Route path="*" element={<BackToHomeErrorPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomeEducationalBot />} />
              <Route path="about" element={<About />} />
              <Route path="contactus" element={<ContactUs />} />
              <Route path="personomics" element={<Personomics />} />
              <Route path="affaq" element={<Affaq />} />
              <Route path="symptoms" element={<Symptoms />} />
              <Route path="medications" element={<Medications />} />
              <Route path="ratecontrol" element={<RateControl />} />
              <Route path="rhythmcontrol" element={<RhythmControl />} />
              <Route path="strokerisk" element={<StrokeRisk />} />
              <Route path="ablation" element={<Ablation />} />
              <Route path="devicepacemaker" element={<DevicePacemaker />} />
              <Route path="obesity" element={<Obesity />} />
              <Route path="sleepapnea" element={<Sleepapnea />} />
              <Route path="alocohol" element={<Alcohol />} />
              <Route path="smoking" element={<Smoking />} />
              <Route path="exercise" element={<Exercise />} />
              <Route path="coronary" element={<Coronary />} />
              <Route path="heartvalves" element={<HeartValves />} />
              <Route path="congestive" element={<Congestive />} />
              <Route path="vascular" element={<Vascular />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="pharmacy" element={<Pharmacy />} />
              <Route path="communityresources" element={<CommunityResources />} />
              <Route path="healthplan" element={<HealthPlan />} />
              <Route path="aco" element={<ACO />} />
              <Route path="ecopharmacy" element={<EcoPharmacy />} />
              <Route path="dietician" element={<Dietician />} />
              <Route path="healthcare" element={<HealthcareConsultant />} />
            </Route>
            <Route path="/" element={<NonAuthLayout />}>
              <Route path="registration" element={<AuthManagerForSignInAndReg />} />
              <Route path="signin" element={<AuthManagerForSignInAndReg />} />
              <Route path="forgot-password" element={<AuthManagerForSignInAndReg />} />
              <Route path="tnc" element={<TermsAndConditionExternal />} />
              <Route path="privacypolicy" element={<PrivaycPolicy />} />
              <Route path="*" element={<BackToSignInErrorPage />} />
            </Route>
            <Route path="*" element={<BackToSignInErrorPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AllRoutes;