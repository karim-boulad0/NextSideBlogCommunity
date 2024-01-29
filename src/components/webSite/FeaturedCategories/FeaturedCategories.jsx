import React, { useState, useContext } from "react";
import "./FeaturedCategories.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/ThemeContext";

const FeaturedCategories = ({ categories }) => {
  const { isDark } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const container = document.getElementById("categories-container");
    const itemWidth = 220; // Adjust this value based on the width of your items
    container.scrollLeft += itemWidth;
  };

  const handlePrev = () => {
    const container = document.getElementById("categories-container");
    const itemWidth = 220; // Adjust this value based on the width of your items
    container.scrollLeft -= itemWidth;
  };

  console.log("currentIndex:", currentIndex);
  return (
    <div className="featured-categories-container">
      <div id="categories-container" className="categories">
        {categories.map((category, index) => (
          <Link
            href={`/website/categories/${category.id}`}
            style={{ color: "inherit", textDecoration: "none" }}
            key={category?.id}
          >
            <div
              className={`category-item ${
                index === currentIndex ? "active" : ""
              }`}
              style={{
                backgroundColor: isDark
                  ? "var(--color-light)"
                  : "var(--color-dark)",
                color: isDark ? "black" : "white",
                width: "200px",
              }}
            >
              <img
                src={category?.image}
                alt={category?.title}
                style={{ width: "100%" }}
              />
              <div className="category-title">{category?.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrev} className="btn">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={handleNext} className="btn">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default FeaturedCategories;
