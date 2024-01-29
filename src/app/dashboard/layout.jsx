"use client";
import NavBar from "@/components/dashboard/navBar/NavBar";
import SideBar from "@/components/dashboard/sidebar/SideBar";
import { MenuProvider } from "@/context/MenuContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Axios } from "@/Api/Axios";
import { useRouter } from "next/navigation";
import "./global.css";
export default function Layout({ children }) {
  const { isDark } = useContext(ThemeContext);
  const router = useRouter();
  const [isGet, setIsGet] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/global/auth");
        setStatus(response.data.status);
        if (response.data.status === "user") {
          // Redirect immediately if the status is "user"
          router.push("/website");
        } else {
          // Continue rendering the content if the status is not "user"
          setIsGet(true);
        }
      } catch (error) {
        router.push("/");
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="position-relative">
      {isGet && status !== "user" && (
        <MenuProvider>
          <NavBar />
          <div
            className="dashboard d-flex gap-1"
            style={{
              backgroundColor: !isDark
                ? "var(--color-dark)"
                : "var(--color-light)",
              color: !isDark ? "white" : "var(--color-dark)",
              minHeight: "100vh",
            }}
          >
            {/* rgba(17,24,39,.5) */}
            <SideBar />
            <div style={{ overflowX: "scroll", width: "100%", margin: "30px" }}>
              {children}
            </div>
          </div>
        </MenuProvider>
      )}
    </div>
  );
}
