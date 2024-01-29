"use client";

// Notifications.js

import React, { useContext, useEffect, useState } from "react";
import "./Notifications.css"; // Import your CSS file for styling
import LikeNotification from "./LikeNotification/LikeNotification";
import CommentNotification from "./CommentNotification/CommentNotification";
import { Axios } from "@/Api/Axios";
import { PostContext } from "@/context/PostContext";
import DislikeNotification from "./DisLikeNotification/DisLikeNotification";
import CustomPagination from "@/components/pagination/CustomPagination";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setCountUnreadNotifications] = useState([]);
  const [action, setAction] = useState([]);
  const { isChange } = useContext(PostContext);
  useEffect(() => {
    Axios.get("/dashboard/admin/notifications")
      .then((res) => {
        setNotifications(res.data.notifications);
      })
      .catch((err) => console.error(err));

    Axios.get("/dashboard/admin/notifications/countUnreadNotifications")
      .then((data) => {
        setCountUnreadNotifications(data.data);
      })
      .catch((err) => console.error(err));
  }, [isChange, action]);
  async function markAllAsRead() {
    try {
      setAction((prev) => prev + 1);
      const res = await Axios.post(
        "/dashboard/admin/notifications/markAllAsRead"
      );
    } catch (err) {
      console.log(err);
    }
  }
  /*------------------------- paginate ---------------------------------*/
  /*-----------------------------------------------------------------------*/
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = notifications.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination
  return (
    <div className="notifications-container">
      <div className="unread-notifications">
        Unread Notifications: {unreadNotifications}
      </div>
      <div className="notifications-list">
        {currentData.map((notification) => {
          if (
            notification.type === "App\\Notifications\\LikeDislikeNotification"
          ) {
            if (notification.data.like.type === "like") {
              return (
                <LikeNotification
                  key={notification.id}
                  notification={notification}
                  color={notification.read_at == null ? "#ADD8E6" : ""}
                  border={true}
                />
              );
            } else if (notification.data.like.type === "dislike") {
              return (
                <DislikeNotification
                  key={notification.id}
                  notification={notification}
                  color={notification.read_at == null ? "#ADD8E6" : ""}
                  border={true}
                />
              );
            }
          } else if (
            notification.type === "App\\Notifications\\CommentNotification"
          ) {
            return (
              <CommentNotification
                key={notification.id}
                notification={notification}
                color={notification.read_at == null ? "#ADD8E6" : ""}
                border={true}
              />
            );
          }
          return null; // Add other notification types as needed
        })}
      </div>
      <CustomPagination
        data={notifications}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />{" "}
    </div>
  );
}
