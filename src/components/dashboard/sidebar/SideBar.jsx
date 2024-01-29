"use client";
import { useContext, useState, useEffect } from "react";
import Styles from "./SideBar.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { MenuContext } from "@/context/MenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NavLinks } from "./NavLink";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { Axios } from "@/Api/Axios";

export default function SideBar(props) {
  const pathname = usePathname();
  const { isOpen } = useContext(MenuContext);
  const { isDark } = useContext(ThemeContext);
  const [auth, setAuth] = useState([]);
  useEffect(() => {
    Axios.get("/global/auth")
      .then((res) => setAuth(res.data))
      .then((err) => console.log(err));
  }, []);
  const showNavLinks = NavLinks.map(
    (link) =>
      link?.status.includes(auth?.status) && (
        <Link
          key={link?.id}
          href={`/dashboard/${link?.to}`}
          style={{
            backgroundColor:
              pathname === link?.currentUrl && "var(--color-primary)",
            color: pathname === link?.currentUrl && "white",
          }}
        >
          <FontAwesomeIcon
            icon={link?.icon}
            className="me-2"
            style={{
              color: pathname !== link?.currentUrl && "var(--color-primary)",
            }}
          />
          {link?.name}
        </Link>
      )
  );
  return (
    <div
      className={`${Styles.sideBar} ${
        isDark ? Styles.sideDark : Styles.sideLight
      }`}
      style={{ display: isOpen ? "" : "none", height: "100vh" }}
    >
      {showNavLinks}
    </div>
  );
}
