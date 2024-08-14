import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/MainLayout/Layout";
import Loading from "./components/MainLayout/Loading";
import MainLayout from "./components/MainLayout/index";
import NonAuthLayout from './components/MainLayout/nonAuthLayout';
import BackToHomeErrorPage from "./components/Pages/BackToHomeErrorPage";
import BackToSignInErrorPage from "./components/Pages/BackToSIgninErrorPage";

// auth
import AuthManagerForSignInAndReg from "./components/Auth/AuthManager";

// non-auth 
const About = React.lazy(() => import("./components/Pages/About"));
const ContactUs = React.lazy(() => import("./components/Pages/ContactUs"));
const Ablation = React.lazy(() => import("./components/Pages/Ablation"));
const ACO = React.lazy(() => import("./components/Pages/Aco"));
const Affaq = React.lazy(() => import("./components/Pages/Affaq"));
const Alcohol = React.lazy(() => import("./components/Pages/Alcohol"));
const Appointments = React.lazy(() => import("./components/Pages/Appointments"));
const CommunityResources = React.lazy(() => import("./components/Pages/CommunityResources"));
const Congestive = React.lazy(() => import("./components/Pages/Congestive"));
const Coronary = React.lazy(() => import("./components/Pages/Coronary"));
const DevicePacemaker = React.lazy(() => import("./components/Pages/DevicePacemaker"));
const Dietician = React.lazy(() => import("./components/Pages/Dietician"));
const EcoPharmacy = React.lazy(() => import("./components/Pages/EcoPharmacy"));
const Exercise = React.lazy(() => import("./components/Pages/Exercise"));
const HealthPlan = React.lazy(() => import("./components/Pages/HealthPlan"));
const HealthcareConsultant = React.lazy(() => import("./components/Pages/HealthcareConsultant"));
const HomeEducationalBot = React.lazy(() => import("./components/Pages/HomeEducationalBot"));
const Medications = React.lazy(() => import("./components/Pages/Medications"));
const HeartValves = React.lazy(() => import("./components/Pages/HeartValves"));
const Obesity = React.lazy(() => import("./components/Pages/Obesity"));
const Personomics = React.lazy(() => import("./components/Pages/Personomics"));
const Pharmacy = React.lazy(() => import("./components/Pages/Pharmacy"));
const Smoking = React.lazy(() => import("./components/Pages/Smoking"));
const Sleepapnea = React.lazy(() => import("./components/Pages/Sleepapnea"));
const Symptoms = React.lazy(() => import("./components/Pages/Symptoms"));
const Vascular = React.lazy(() => import("./components/Pages/Vascular"));
const TermsAndConditionExternal = React.lazy(() => import("./components/Pages/TermsAndConditionExternal"));

// auth-user
const Home = React.lazy(() => import("./components/InnerApp/Home/HomeManager"));
const Profile = React.lazy(() => import("./components/InnerApp/Profile/ProfileManager"));
const Dashboard = React.lazy(() => import("./components/InnerApp/Dashboard/Dashboard"));
const HistorySummary = React.lazy(() => import("./components/InnerApp/HistorySummary/HistorySummary"));
const HistoryChat = React.lazy(() => import("./components/InnerApp/HistoryChatBot/HistoryChatBot"));
const BehavioralChat = React.lazy(() => import("./components/InnerApp/BehaviouralChatBot/BehaviouralChatBot"));

// Admin
const ApproveUsers = React.lazy(() => import("./components/Admin/ApproveUsers/index"));
const BotQuestionnaire = React.lazy(() => import("./components/Admin/BotQuestionnaire/index"));
const ListofPatients = React.lazy(() => import("./components/Admin/ListofPatients/index"));
const DoctorsList = React.lazy(() => import("./components/InnerApp/DoctorsList/index"));
const RoleManagement = React.lazy(() => import("./components/Admin/RoleManagement/index"));
const UserManagement = React.lazy(() => import("./components/Admin/UserManagement/index"));
const UploadDocument = React.lazy(() => import("./components/Admin/UploadDocument/index"));
const HealthHubBuilder = React.lazy(() => import("./components/Admin/HealthHubBuilder/index"));

const AllRoutes = ({ authenticated, setIsAuthenticated }) => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed
  }, [pathname]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer theme="light" />
      <Routes>
        {authenticated ? (
          <>
            <Route path="/" element={<MainLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="home" element={<Home />} />
              <Route path="chat" element={<BehavioralChat />} />
              <Route path="historychat" element={<HistoryChat />} />
              <Route path="transcriptsummary" element={<HistorySummary />} />
              <Route path="botquestionnaire" element={<BotQuestionnaire />} />
              <Route path="approveusers" element={<ApproveUsers />} />
              <Route path="patientslist" element={<ListofPatients />} />
              <Route path="doctorslist" element={<DoctorsList />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="roles" element={<RoleManagement />} />
              <Route path="uploaddocument" element={<UploadDocument />} />
              <Route path="healthhubbuilder" element={<HealthHubBuilder />} />
              <Route path="*" element={<BackToHomeErrorPage />} />
            </Route>
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
              <Route path="communityresources" element={<CommunityResources />}
              />
              <Route path="healthplan" element={<HealthPlan />} />
              <Route path="aco" element={<ACO />} />
              <Route path="ecopharmacy" element={<EcoPharmacy />} />
              <Route path="dietician" element={<Dietician />} />
              <Route path="healthcare" element={<HealthcareConsultant />} />
            </Route>
            <Route path="/" element={<NonAuthLayout />}>
              {/* <Route path="signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} /> */}
              <Route path="registration" element={<AuthManagerForSignInAndReg />} />
              <Route path="signin" element={<AuthManagerForSignInAndReg />} />
              <Route path="forgot-password" element={<AuthManagerForSignInAndReg />} />
              <Route path="*" element={<BackToSignInErrorPage />} />
              <Route path="tnc" element={<TermsAndConditionExternal />} />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
};

export default AllRoutes;
