"use client";

import Cookie from "cookie-universal";
import { useEffect, useContext, useState } from "react";
import { Axios } from "@/Api/Axios";
import { useRouter } from "next/navigation";
import Login from "@/components/auth/login/Login";
import Register from "@/components/auth/register/Register";
import "./LayoutAuth.css";
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
const LayoutAuth = () => {
  const { isDark } = useContext(ThemeContext);
  const [showLogin, setShowLogin] = useState(true);
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [isAuth, setIsAuth] = useState();
  const [isNotAuth, setIsNotAuth] = useState();
  const [isFinished, setIsFinished] = useState();
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    Axios.get("/global/auth")
      .then((data) => {
        setIsAuth(data.data);
        setIsFinished(true);
      })
      .catch((err) => {
        console.log(err);
        setIsNotAuth(401);
      });
  }, []);

  // get the last location (pathname)
  if (token && isAuth) {
    window.history.back();
  } else if (isFinished || isNotAuth === 401) {
    if (isAuth && (isAuth.status === "admin" || isAuth.status === "writer")) {
      router.push("/dashboard"); // Redirect to /dashboard for admin or writer
    } else if (isAuth && isAuth.status === "user") {
      router.push("/website"); // Redirect to /website for users
    } else {
      return (
        <div className='container mt-2 '>
          <div className='text-center mt-3 mb-3'>
            <Link href='/website' className='btn btn-outline-custom'>
              Explore the Website
            </Link>
          </div>

          <div className='d-flex justify-content-center '>
            <div className='btn-group'>
              <button
                onClick={toggleForm}
                className={`btn ${
                  showLogin ? "btn-primary-custom" : "btn-light-custom"
                } ${showLogin ? "active" : ""}`}
              >
                Login
              </button>
              <button
                onClick={toggleForm}
                className={`btn ${
                  showLogin ? "btn-light-custom" : "btn-primary-custom"
                } ${showLogin ? "" : "active"}`}
              >
                Register
              </button>
            </div>
          </div>

          {showLogin ? <Login /> : <Register />}
        </div>
      );
    }
  } else {
    return <></>;
  }
};

export default LayoutAuth;
