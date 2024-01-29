"use client";
import { ThemeContext } from "@/context/ThemeContext";

import Image from "next/image";
import { useContext } from "react";
import Footer from "./postComponents/Footer";
import { formatDistanceToNow } from "date-fns";
import { WindowContext } from "@/context/WindowContext";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function Post({ post }) {
  const { isDark } = useContext(ThemeContext);
  const { windowWidth } = useContext(WindowContext);
  const formatRelativeTime = (dateString) => {
    if (dateString) {
      const formattedDate = formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
      });
      return formattedDate;
    } else {
      const formattedDate = "invalid time ";
    }
  };

  return (
    <div
      className="post-card  m-auto mt-2 p-3"
      style={{
        backgroundColor: !isDark
          ? "var(--color-dark-layout)"
          : "var(--color-light-layout)",
        color: !isDark ? "white" : "black",
        width: windowWidth >= 650 ? "65%" : "85%",
      }}
    >
      <div className="header d-flex justify-content-between">
        <div className="head-post d-flex gap-1">
          <Link href={`/website/writers/${post?.user?.id}`}>
            <Image
              width={40}
              height={40}
              src={
                post?.user?.photo ? post?.user?.photo : "http:\\127.0.0.1:8000"
              }
              alt="prof"
            />
            <div style={{ color: isDark ? "black" : "white" }}>
              <div>{post?.user?.name}</div>
              <div className="" style={{ fontSize: "12px" }}>
                {formatRelativeTime(post?.updated_at)}
              </div>
            </div>
          </Link>
        </div>
        <h3>
          <div className="bar-icon">...</div>
        </h3>
      </div>

      <div className="content mt-2">
        <div className="text">
          <h1>{post?.title}</h1>
          {post?.content}
        </div>

        <Image
          width={200}
          height={280}
          src={post?.image ? post?.image : "http:\\127.0.0.1"}
          alt="prof"
          className="w-100 height-100"
        />
      </div>
      <hr />
      <Footer post={post} isDark={isDark} />
    </div>
  );
}
