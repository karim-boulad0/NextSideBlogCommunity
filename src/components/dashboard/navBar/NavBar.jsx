"use client";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import DarkModeToggle from "../../DarkModeToggle/DarkModeToggle";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { MenuContext } from "@/context/MenuContext";
import "./NavBar.css";
import { Axios } from "@/Api/Axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DropDarkModeToggle from "@/components/DarkModeToggle/DropDarkModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faRightFromBracket,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { ReRenderContext } from "@/context/ReRenderContext";
import DropDownNotifications from "./Notifications/DropDownNotifications";
export default function NavBar() {
  const { isAction } = useContext(ReRenderContext);

  const { isDark } = useContext(ThemeContext);
  const { setIsOpen } = useContext(MenuContext);
  const [user, setUser] = useState([]);
  const [settings, setSettings] = useState([]);
  const [isGet, setIsGet] = useState(false);
  const router = useRouter();
  // get auth
  useEffect(() => {
    Axios.get("/global/auth")
      .then((response) => {
        setIsGet(true);
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, [isAction]);
  // get settings
  useEffect(() => {
    Axios.get("/global/settings")
      .then((response) => {
        setSettings(response.data);
      })
      .catch((err) => console.log(err));
  }, [isAction]);
  // handle logout
  function handleLogOut() {
    try {
      Axios.get("/logout");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="top-bar  d-flex align-items-center justify-content-between px-5"
      style={{
        backgroundColor: isDark
          ? "var(--color-light-layout)"
          : "var(--color-dark-layout)",
        color: isDark ? "var(--color-dark-layout)" : "white",
      }}
    >
      <div className="d-flex align-items-center">
        <div className="logo me-4">
          <Link href="/website">
            <Image
              src={settings.logo ? settings.logo : "http://127.0.0.1"}
              alt="logo"
              width={35}
              height={35}
            />
          </Link>
        </div>
        <FontAwesomeIcon
          cursor={"pointer"}
          onClick={() => setIsOpen((prev) => !prev)}
          icon={faBars}
          className="ms-4"
        />
      </div>

      <div className="text-center d-flex align-items-center gap-4">
        <DropDownNotifications />

        <NavDropdown
          title={
            user?.photo ? (
              <Image
                src={user?.photo ? user?.photo : "http://127.0.0.1"}
                width={30}
                height={30}
                alt="prof"
                className="mb-1"
                style={{ borderRadius: "100%" }}
              />
            ) : (
              <FontAwesomeIcon icon={faUser} className="fs-6" />
            )
          }
          className="pt-2 mb-2  "
          id="basic-nav-dropdown"
          style={{ color: "var(--color-primary)", opacity: "+1" }}
          menuVariant={!isDark ? `dark` : "light"}
          variant="light"
        >
          <NavDropdown.Item>
            <Link
              className="list-down"
              href={`/dashboard/users/${user?.id}`}
              style={{
                textDecoration: "none",
                color: isDark ? "black" : "white",
              }}
            >
              <FontAwesomeIcon icon={faUserTie} /> {isGet && user?.name}
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <DropDarkModeToggle />
          </NavDropdown.Item>
          <NavDropdown.Item>
            <div className="" onClick={() => handleLogOut()}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </div>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
}
