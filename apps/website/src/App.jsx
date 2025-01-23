// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/page";
import Appointment from "./Pages/Appointment/page";
import Doctor_Dashboard from "./Pages/Doctor_Dashboard/Doctor_Dashboard";
// import Header from './Components/Header/Header';
import Add_Doctor from "./Pages/Add_Doctor/Add_Doctor";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Pages/SignUp/SignUp";
import SignUpDetails from "./Pages/SignUpDetails/SignUpDetails";
import Pricing from "./Pages/Pricing/Pricing";
import Homepage from "./Pages/Homepage/Homepage";
import Clinic_visiblity from "./Pages/Clinic_visiblity/Clinic_visiblity";
import Add_Vet from "./Pages/Add_Vet/Add_Vet";
import Contact_us from "./Pages/Contact_us/Contact_us";
import DepartmentsMain from "./Pages/DepartmentsMain/page";
import Add_Prescription from "./Pages/Add_Prescription/Add_Prescription";
import Prescription from "./Pages/Prescription/Prescription";
import DownlodeApp from "./Pages/DownlodeApp/DownlodeApp";
import ArticlePage from "./Pages/ArticlePage/page";
import Blogpage from "./Pages/Blogpage/page";
import AssessmentManagement from "./Pages/AssessmentManagement/AssessmentManagement";
import Add_Department from "./Pages/Add_Department/Add_Department";
import DeveloperLandingPage from "./Pages/DeveloperLandingPage/DeveloperLandingPage";
import MainLandingPage from "./Pages/MainLandingPage/MainLandingPage";
import ChatDashboard from "./Pages/ChatDashboard/ChatDashboard";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CheckIn from "./Pages/CheckIn/CheckIn";
import DevlpSignup from "./Pages/DevlpSignup/DevlpSignup";
import Inventory from "./Pages/Inventory/Inventory";
import DevlpSignin from "./Pages/DevlpSignin/page";
import SignIn from "./Pages/SignIn/SignIn";
import InventoryDetail from "./Pages/InventoryDetail/InventoryDetail";
import AddInventory from "./Pages/AddInventory/AddInventory";
import AddProcedurePackage from "./Pages/AddProcedurePackage/AddProcedurePackage";
import RevenueManagement from "./Pages/RevenueManagement/RevenueManagement";
import MainHeader from "./Components/MainHeader/MainHeader";

const Layout = () => {
  const navigate = useNavigate();
  const { tokens, initializeUser } = useAuth();
  const location = useLocation();
  console.log("yyy", tokens);
  useEffect(() => {
    initializeUser();
  }, []);

  const mainHeaderRoutes = [
    "/dashboard",
    "/appointment",
    "/doctordashboard",
    "/inventory",
    "/addoctor",
    "/addvet",
    "/Addprescription",
    "/prescription",
    "/AddInventory",
    "/AddProcedurePackage",
    "/revenuemangement",
    "/pricing",
    "/clinicvisible",
    "/Addprescription",
    "/prescription",
    "/addvet",
    "/department",
    // "/downlodeapp",
    "/articlepage",
    "/AssessmentManagement",
    "/add_department",
    // "/DeveloperLandingPage",
    "/Chatting",
    "/CheckIn",
    "/inventorydetails",
    "/AddProcedurePackage",
    "/lblogpage",
  ];
  const isMainHeader = tokens && mainHeaderRoutes.includes(location.pathname);

  // List of routes where the footer should be displayed
  const footerRoutes = [
    "/",
    "/pricing",
    "/contact",
    "/blogpage",
    "/articlepage",
    "/downlodeapp",
    "/DeveloperLandingPage",
    "/MainLandingPage",
  ];
  const showFooter = footerRoutes.includes(location.pathname);

  const protectedRoutes = [
    "/dashboard",
    "/appointment",
    "/doctordashboard",
    "/inventory",
    "/addoctor",
    "/addvet",
    "/Addprescription",
    "/prescription",
    "/AddInventory",
    "/AddProcedurePackage",
    "/revenuemangement",
    "/pricing",
    "/clinicvisible",
    "/Addprescription",
    "/prescription",
    "/addvet",
    "/department",
    // "/downlodeapp",
    "/articlepage",
    "/AssessmentManagement",
    "/add_department",
    // "/DeveloperLandingPage",
    "/Chatting",
    "/CheckIn",
    "/inventorydetails",
    "/lblogpage",
  ];
  console.log("ddd", tokens);

  console.log("location.pathname", location.pathname);
  const shouldRedirect = !tokens && protectedRoutes.includes(location.pathname);
  console.log("shouldRedirect", shouldRedirect);
  if (shouldRedirect) {
    navigate("/signin");
  }

  const shouldNotRedirect =
    tokens &&
    [
      "/signin",
      "/signup",
      "/homepage",
      // "/signupdetails",
      "/downlodeapp",
      "/contact",
      "/blogpage",
      "/devSignup",
      "/devSignin",
      "/DeveloperLandingPage",
    ].includes(location.pathname);

  if (shouldNotRedirect) {
    navigate("/dashboard");
  }

  return (
    <>
      {/* <Header /> */}

      <MainHeader isMainHeader={isMainHeader} />
      <Routes>
        <Route path="/homepage" element={<Homepage />} /> {/* //not placeed*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctordashboard" element={<Doctor_Dashboard />} />
        <Route path="/addoctor" element={<Add_Doctor />} />
        <Route path="/signup" element={<SignUp />} /> {/* //not placeed*/}
        <Route path="/signin" element={<SignIn />} /> {/* //not placeed*/}
        <Route path="/signupdetails" element={<SignUpDetails />} /> {/* //not placeed*/}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/clinicvisible" element={<Clinic_visiblity />} />
        <Route path="/Addprescription" element={<Add_Prescription />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/addvet" element={<Add_Vet />} />
        <Route path="/department" element={<DepartmentsMain />} />
        <Route path="/contact" element={<Contact_us />} /> {/* //not placeed*/}
        <Route path="/downlodeapp" element={<DownlodeApp />} />
        <Route path="/articlepage" element={<ArticlePage />} />
        <Route path="/blogpage" element={<Blogpage />} />
        <Route path="/lblogpage" element={<Blogpage />} />
        <Route
          path="/AssessmentManagement"
          element={<AssessmentManagement />}
        />
        <Route path="/add_department" element={<Add_Department />} />
        <Route
          path="/DeveloperLandingPage"
          element={<DeveloperLandingPage />}
        />
        <Route path="/" element={<MainLandingPage />} /> {/* //not placeed*/}
        <Route path="/Chatting" element={<ChatDashboard />} />
        <Route path="/CheckIn" element={<CheckIn />} />
        <Route path="/devSignup" element={<DevlpSignup />} />
        <Route path="/devSignin" element={<DevlpSignin />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventorydetails" element={<InventoryDetail />} />
        <Route path="/AddInventory" element={<AddInventory />} />
        <Route path="/AddProcedurePackage" element={<AddProcedurePackage />} />
        <Route path="/revenuemangement" element={<RevenueManagement />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
