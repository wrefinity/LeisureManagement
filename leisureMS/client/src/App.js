import './App.css';
import React, { useEffect } from "react";
import { Route, Routes,  useLocation } from "react-router-dom";
// import { useCookies } from "react-cookie";
import Footer from './components/Footer';
import Home from './screens/Home';
import { ToastContainer } from "react-toastify";
import Layout from './components/layout'
import NavBar from './components/NavBar';
import BookingListings from './screens/BookingListings';
import Login from './screens/Login';
import Register from './screens/Register';
import BookingAdd from './components/BookingAdd';
import CategoryAdd from "./components/CategoryAdd"
import ResetPassword from './screens/ResetPassword';
import NewPassword from './screens/NewPassword';
import ReservationAdd from './components/ReservationAdd';
import Services from './components/Services';
import BookingMade from './components/BookingMade';
import Profile from './components/Profile';
import About from './screens/About';
import UserList from './components/UserList';
import CouponList from './components/CouponList';

function App() {
  return (
    <div>
      <NavBar />
      <ToastContainer />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password_reset" element={<ResetPassword/>}/>
            <Route path="/reset_now/:id" element={<NewPassword />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<BookingMade />} />
            <Route path="/booking/:id" element={<BookingAdd />} />
            <Route path="/reservation_add" element={<ReservationAdd />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/coupons" element={<CouponList />} />
            <Route path="/categories" element={<CategoryAdd />} />
            <Route path="/product_all" element={<BookingListings />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>

      </ScrollToTop>
      <Footer/>
    </div>
  );



}

// const ProtectUserRoute = ({ children }) => {
//   const [cookies] = useCookies();
//   const user = cookies.user;
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// const ProtectAdminRoute = ({ children }) => {
//   const [cookies] = useCookies();
//   const user = cookies.user;
//   if (!user) {
//     return <Navigate to="/" replace />;
//   } else if (!user.isAdmin) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// const PreventMultipleLogin = ({ children }) => {
//   const [cookies] = useCookies();
//   const user = cookies.user;
//   if (user) {
//     return <Navigate to="/shop" replace />;
//   } else {
//     return children;
//   }
// };

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
};

export default App;
