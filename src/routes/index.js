import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout3 from "../components/Layout/Layout3";
import HomeStyle3 from "../components/Pages/HomeStyle3";
import About from "../components/Pages/About";
import { useEffect, useState } from "react";
import ErrorPage from "../components/Pages/ErrorPage";
import Appointments from "../components/Pages/Appointments";
import Signin from "../components/Signin";
import Register from "../components/Register";
import Dashboard from "../components/InnerApp/Dashboard/Dashboard";
import MainLayout from "../components/InnerApp/MainLayout";
import Profile from "../components/InnerApp/Profile/Profile";
import HistorySummary from "../components/InnerApp/HistorySummary/HistorySummary";
import Home from "../components/InnerApp/Home/Home";
import Personomics from "../components/Pages/Personomics";
import Dietician from "../components/Pages/Dietician";
import EcoPharmacy from "../components/Pages/EcoPharmacy";
import ACO from "../components/Pages/Aco";
import HealthPlan from "../components/Pages/HealthPlan";
import CommunityResources from "../components/Pages/CommunityResources";
import Pharmacy from "../components/Pages/Pharmacy";
import Vascular from "../components/Pages/Vascular";
import Coronary from "../components/Pages/Coronary";
import Exercise from "../components/Pages/Exercise";
import Smoking from "../components/Pages/Smoking";
import Alcohol from "../components/Pages/Alcohol";
import Sleepapnea from "../components/Pages/Sleepapnea";
import Obesity from "../components/Pages/Obesity";
import DevicePacemaker from "../components/Pages/DevicePacemaker";
import Ablation from "../components/Pages/Ablation";
import Medications from "../components/Pages/Medications";
import Symptoms from "../components/Pages/Symptoms";
import Affaq from "../components/Pages/Affaq";
import Chat from "../components/Pages/Chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "../components/ForgotPassword";
import BotQuestionnaire from "../components/Admin/BotQuestionnaire";
import HealthcareConsultant from "../components/Pages/HealthcareConsultant";
import HistoryChat from "../components/Pages/HistoryChat";
import HeartValves from "../components/Pages/HeartValves";
import Congestive from "../components/Pages/Congestive";
import HistoryChatNew from "../components/Pages/HistoryChatNew";
import Loading from "../components/InnerApp/LoadingComponent";
import Terms from "../components/Terms/Terms";
import PrivacyPolicy from "../components/Terms/PrivacyPolicy";
import ApproveUsers from "../components/Admin/ApproveUsers";
import ListofPatients from "../components/Admin/ListofPatients";
import DoctorsList from "../components/InnerApp/DoctorsList";

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
              {/* <Route path="doctors" element={<Doctors />} />
                <Route path="doctors/:doctorId" element={<DoctorDetails />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:blogId" element={<BlogDetails />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="departments" element={<Departments />} />
                <Route
                path="departments/:departmentId"
                element={<DepartmentDetails />}
                />
                <Route path="pricing-plan" element={<PricingPlan />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="contact" element={<Contact />} /> */}
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
