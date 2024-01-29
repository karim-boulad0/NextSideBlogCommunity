"use client";
// FeaturedNews.js
import React, { useContext, useEffect, useRef } from "react";
import Link from "next/link";
import "./FeaturedNews.css";
const FeaturedNews = ({ posts }) => {
  const tickerRef = useRef(null);
  useEffect(() => {
    const ticker = tickerRef.current;
    const duration = posts.length * 10 + "s";
    ticker.style.animationDuration = duration;
  }, [posts]);
  return (
    <div className="ticker" ref={tickerRef} style={{ height: "100px" }}>
      {posts.map((post) => (
        <Link href={`/website/posts/${post.id}`} key={post?.id}>
          <div className="ticker-item">
            <h4>{post?.title}</h4>
            <span>{post?.content}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default FeaturedNews;
