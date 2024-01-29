import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css";
import Link from "next/link";

const Slider = ({ posts }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="custom-slider"
    >
      {posts.map((post) => (
        <Carousel.Item key={post.id}>
          <img className="d-block w-100" src={post.image} alt={post.title} />
          <Carousel.Caption>
            <h3>{post.title}</h3>
            <p>{post.smallDesc}</p>
            <Link
              href={`/website/posts/${post.id}`}
              className="btn mb-3 "
              style={{ backgroundColor: "var(--color-primary)" }}
              alt="image"
            >
              Read More
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
