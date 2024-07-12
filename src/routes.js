import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorPage = React.lazy(() => import("./components/Pages/ErrorPage"));
const Loading = React.lazy(() => import("./components/MainLayout/Loading"));
const MainLayout = React.lazy(() => import("./components/MainLayout/index"));
const Layout3 = React.lazy(() => import("./components/MainLayout/Layout3"));

// non-auth 
const About = React.lazy(() => import("./components/Pages/About"));
const Ablation = React.lazy(() => import("./components/Pages/Ablation"));
const ACO = React.lazy(() => import("./components/Pages/Aco"));
const Affaq = React.lazy(() => import("./components/Pages/Affaq"));
const Alcohol = React.lazy(() => import("./components/Pages/Alcohol"));
const Appointments = React.lazy(() => import("./components/Pages/Appointments"));
const Chat = React.lazy(() => import("./components/Pages/Chat"));
const CommunityResources = React.lazy(() => import("./components/Pages/CommunityResources"));
const Congestive = React.lazy(() => import("./components/Pages/Congestive"));
const Coronary = React.lazy(() => import("./components/Pages/Coronary"));
const DevicePacemaker = React.lazy(() => import("./components/Pages/DevicePacemaker"));
const Dietician = React.lazy(() => import("./components/Pages/Dietician"));
const EcoPharmacy = React.lazy(() => import("./components/Pages/EcoPharmacy"));
const Exercise = React.lazy(() => import("./components/Pages/Exercise"));
const HealthPlan = React.lazy(() => import("./components/Pages/HealthPlan"));
const HealthcareConsultant = React.lazy(() => import("./components/Pages/HealthcareConsultant"));
const HistoryChatNew = React.lazy(() => import("./components/Pages/HistoryChatNew"));
const HomeStyle3 = React.lazy(() => import("./components/Pages/HomeStyle3"));
const Medications = React.lazy(() => import("./components/Pages/Medications"));
const HeartValves = React.lazy(() => import("./components/Pages/HeartValves"));
const Obesity = React.lazy(() => import("./components/Pages/Obesity"));
const Personomics = React.lazy(() => import("./components/Pages/Personomics"));
const Pharmacy = React.lazy(() => import("./components/Pages/Pharmacy"));
const Smoking = React.lazy(() => import("./components/Pages/Smoking"));
const Sleepapnea = React.lazy(() => import("./components/Pages/Sleepapnea"));
const Symptoms = React.lazy(() => import("./components/Pages/Symptoms"));
const Vascular = React.lazy(() => import("./components/Pages/Vascular"));

// auth
const Register = React.lazy(() => import("./components/Auth/Register"));
const Signin = React.lazy(() => import("./components/Auth/SignIn"));
const PrivacyPolicy = React.lazy(() => import("./components/Auth/PrivacyPolicy"));
const Terms = React.lazy(() => import("./components/Auth/Terms&Confition"));
const ForgotPassword = React.lazy(() => import("./components/Auth/ForgotPassword"));

// auth-user
const Home = React.lazy(() => import("./components/InnerApp/Home/HomeManager"));
const Profile = React.lazy(() => import("./components/InnerApp/Profile/ProfileManager"));
const Dashboard = React.lazy(() => import("./components/InnerApp/Dashboard/Dashboard"));
const HistorySummary = React.lazy(() => import("./components/InnerApp/HistorySummary/HistorySummary"));

// Admin
const ApproveUsers = React.lazy(() => import("./components/Admin/ApproveUsers/index"));
const BotQuestionnaire = React.lazy(() => import("./components/Admin/BotQuestionnaire/index"));



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
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="home" element={<Home />} />
              <Route path="transcriptsummary" element={<HistorySummary />} />
              <Route path="botquestionnaire" element={<BotQuestionnaire />} />
              <Route path="approveusers" element={<ApproveUsers />} />
              {/* <Route path="patientslist" element={<ListofPatients />} />
              <Route path="doctorslist" element={<DoctorsList />} /> */}
              <Route path="profile" element={<Profile />} />
              <Route path="chat" element={<Chat />} />
              {/* <Route path="historychat" element={<HistoryChat />} /> */}
              <Route path="historychat" element={<HistoryChatNew />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Layout3 />}>
              <Route index element={<HomeStyle3 />} />
              <Route path="about" element={<About />} />
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
              <Route
                path="communityresources"
                element={<CommunityResources />}
              />
              <Route path="healthplan" element={<HealthPlan />} />
              <Route path="aco" element={<ACO />} />
              <Route path="ecopharmacy" element={<EcoPharmacy />} />
              <Route path="dietician" element={<Dietician />} />
              <Route path="healthcare" element={<HealthcareConsultant />} />
            </Route>
            <Route path="signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
            <Route path="registration" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AllRoutes;
