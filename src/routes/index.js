import { Route, Routes, useLocation } from "react-router-dom";
import Layout3 from "../components/Layout/Layout3";
import HomeStyle3 from "../components/Pages/HomeStyle3";
import About from "../components/Pages/About";
import { useEffect } from "react";
import ErrorPage from "../components/Pages/ErrorPage";
import Appointments from "../components/Pages/Appointments";
import Signin from "../components/Signin";
import Register from "../components/Register";
import Dashboard from "../components/InnerApp/Dashboard/Dashboard";
import MainLayout from "../components/InnerApp/MainLayout";
import Profile from "../components/InnerApp/Profile/Profile";
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
import Chat from "../components/Pages/Chat"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "../components/Pages/Chat"

const AllRoutes = ({ authenticated, setIsAuthenticated }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ToastContainer theme="light" />
      <Routes>
        {authenticated ? (
          <>
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="chat" element={<Chat />} />

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
            <Route path="registration" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AllRoutes;
