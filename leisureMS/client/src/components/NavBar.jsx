import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import logo from "../assets/img/logo.png"
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import decode from "jwt-decode";

// custom function 
import { setLogout, getUser } from "../slicer/Auth"
import { getUsers, reseter as resetUsers } from "../slicer/UserSlice";
import { getReservation, reseter as resetReserve } from "../slicer/Reservations";
import { getBooking, reseter as resetBooking } from "../slicer/Booking";
import { getCategory, reseter as ResetCat } from "../slicer/Category";
import { getCoupons, reseter as ResetCoups } from "../slicer/Coupons";

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector(getUser);
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
      <Navigate to="/login" state={{ from: location }} replace />;

    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/login', { state: { from: location }, replace: true });
  };

  useEffect(() => {
    dispatch(getCategory());
    dispatch(ResetCat())
    dispatch(getReservation());
    dispatch(resetReserve())
    dispatch(getBooking());
    dispatch(resetBooking())
    dispatch(getCoupons());
    dispatch(ResetCoups())
    if (
      user?.isAdmin
    ) {
      dispatch(getUsers());
      dispatch(resetUsers());
    }
  }, [dispatch]);


  return (

    <Navbar bg="light" expand="lg" className='naver px-2'>
      <Navbar.Brand href="#home" className="mr-auto">
        {/* <img
          src={logo}
          alt="Your Logo"
          width="50"
          height="30"
          className="d-inline-block align-top"
        /> */}
        <h4>Leisure</h4>

      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="ml-auto ">
          <Nav.Link href="/">Home</Nav.Link>
          {user && (
            <>
              <Nav.Link href="/services">Book</Nav.Link>
              <Nav.Link href="/booking">Bookings</Nav.Link>
            </>
          )}
          {user?.isAdmin && (
            <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="/product_all">Services</NavDropdown.Item>
            <NavDropdown.Item href="/categories">Category</NavDropdown.Item>
            <NavDropdown.Item href="/reservation_add">Reservations</NavDropdown.Item>
            <NavDropdown.Item href="/users">Users</NavDropdown.Item>
            <NavDropdown.Item href="/coupons">Coupons</NavDropdown.Item>
          </NavDropdown>
            
            )}

          {user && (
            <>
              <Nav.Link className='text-bold'> <i>
                Welcome {user?.details?.username}
              </i>
              </Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
          {!user && (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>


  );
};

export default NavBar;
