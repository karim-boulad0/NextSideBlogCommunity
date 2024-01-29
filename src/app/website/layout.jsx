"use client";
import { Axios } from "@/Api/Axios";
import NavBar from "@/components/webSite/navBar/NavBar";
import FeaturedCategories from "@/components/webSite/FeaturedCategories/FeaturedCategories";
import FeaturedNews from "@/components/webSite/news/FeaturedNews";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import Slider from "@/components/webSite/Slider/Slider";
import { SearchProvider } from "@/context/SearchContext";

export default function Layout({ children }) {
  const { isDark } = useContext(ThemeContext);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: !isDark ? "var(--color-dark)" : "var(--color-light)",
      }}
    >
      <SearchProvider>
        <NavBar />
        <div className="container">{children}</div>
      </SearchProvider>
    </div>
  );
}
