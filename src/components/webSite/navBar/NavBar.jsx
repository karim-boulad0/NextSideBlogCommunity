"use client";
import { Container, Dropdown, Nav, NavDropdown, Navbar } from "react-bootstrap";
import DarkModeToggle from "../../DarkModeToggle/DarkModeToggle";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import { Axios } from "@/Api/Axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDarkModeToggle from "@/components/DarkModeToggle/DropDarkModeToggle";
import { WindowContext } from "@/context/WindowContext";
import {
  faMagnifyingGlass,
  faRightFromBracket,
  faToolbox,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { ReRenderContext } from "@/context/ReRenderContext";
import "./Navbar.css";
import { SearchContext } from "@/context/SearchContext";
export default function NavBar() {
  const { query, setQuery } = useContext(SearchContext);
  const { isDark } = useContext(ThemeContext);
  const { isAction } = useContext(ReRenderContext);
  const [settings, setSettings] = useState([]);
  const [auth, setAuth] = useState([]);
  const [CheckAuth, setCheckAuth] = useState("");
  const { windowWidth } = useContext(WindowContext);
  const router = useRouter();
  useEffect(() => {
    Axios.get("/global/auth")
      .then((response) => {
        setAuth(response.data);
        setCheckAuth(response.data);
      })
      .catch((err) => console.log(err));
  }, [isAction]);

  useEffect(() => {
    Axios.get("/global/settings")
      .then((response) => setSettings(response.data))
      .catch((err) => console.log(err));
  }, []);
  // handle logout
  function handleLogOut() {
    try {
      Axios.get("/logout");
      router.push("/");
    } catch (err) {
      router.push("/");
      console.log(err);
    }
  }

  // right side
  const showRightSide = (
    <div className="d-flex me-5 mb-1">
      {CheckAuth == "" ? (
        <>
          <Link
            className="btn  me-3"
            href="/"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Login
          </Link>
          <DarkModeToggle />
        </>
      ) : (
        //  user details logout and  ...
        <NavDropdown
          title={
            auth?.photo ? (
              <Image
                src={auth?.photo ? auth?.photo : "http://127.0.0.1"}
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
          className="mt-2 pt-1 ms-3  "
          style={{ color: "var(--color-primary)" }}
          id="basic-nav-dropdown"
          drop="down"
          align={windowWidth <= 580 ? "start" : "end"}
        >
          <NavDropdown.Item>
            <Link className="nav-link" href="/website/profile">
              <FontAwesomeIcon icon={faUserTie} /> {auth?.name}
            </Link>
          </NavDropdown.Item>
          {CheckAuth && auth?.status !== "user" && (
            <NavDropdown.Item>
              <Link className="nav-link" href="/dashboard">
                <FontAwesomeIcon icon={faToolbox} /> Dashboard
              </Link>
            </NavDropdown.Item>
          )}
          <NavDropdown.Item>
            <DropDarkModeToggle />
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleLogOut()}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </div>
  );
  const showSearch = (
    <div className="text-center me-2">
      <div className="search-container">
        <div className="input-group">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search Here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn search-icon btn-success" type="button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar
        expand={"sm"}
        bg={!isDark ? "dark" : "light"}
        data-bs-theme={!isDark ? "dark" : "light"}
        className="shadow-sm"
      >
        <Container className="mt-0">
          <Navbar.Brand>
            <Link
              href="/website"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Image
                src={settings?.logo ? settings?.logo : "http://127.0.0.1"}
                width={35}
                height={35}
                alt="logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link
                  href="/website"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  href="/website/categories"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Categories
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  href="/website/posts"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  News
                </Link>
              </Nav.Link>
            </Nav>
            {showSearch}
            {showRightSide}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
