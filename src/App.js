import { Route, Routes, useLocation } from 'react-router-dom';
import Layout3 from './components/Layout/Layout3';
import HomeStyle3 from './components/Pages/HomeStyle3';
import About from './components/Pages/About';
import { useEffect } from 'react';
import ErrorPage from './components/Pages/ErrorPage';
import Signin from './components/Signin';
import Register from './components/Register';
import Dashboard from './components/InnerApp/Dashboard/Dashboard';
import MainLayout from './components/InnerApp/MainLayout';
import Profile from './components/InnerApp/Profile/Profile';
import Home from './components/InnerApp/Home/Home';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout3 />}>
        <Route index element={<HomeStyle3 />} />
        <Route path="about" element={<About />} />
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
      <Route path="signin" element={<Signin />} />
      <Route path="registration" element={<Register />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
