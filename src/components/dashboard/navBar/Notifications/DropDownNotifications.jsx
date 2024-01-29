"use client";
import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./Notifications.css"; // Import your CSS file for styling
import LikeNotification from "./LikeNotification/LikeNotification";
import DislikeNotification from "./DislikeNotification/DislikeNotification";
import CommentNotification from "./CommentNotification/CommentNotification";
import { Axios } from "@/Api/Axios";
import { PostContext } from "@/context/PostContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/ThemeContext";

export default function DropDownNotifications() {
  const { isDark } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setCountUnreadNotifications] = useState([]);
  const [action, setAction] = useState([]);
  const visibleNotifications = 5;
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

  async function markAsReadById(id) {
    try {
      const res = await Axios.post(
        `/dashboard/admin/notifications/markAsReadById/${id}`
      );
      setAction((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  }

  async function markAllAsRead() {
    try {
      await Axios.post("/dashboard/admin/notifications/markAllAsRead");
      setAction((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="notifications-container">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-notifications">
          <span
            style={{
              position: "absolute",
              top: "-1px",
              right: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
            }}
          >
            {unreadNotifications}
          </span>
          <FontAwesomeIcon icon={faBell} />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ overflowX: "scroll", maxHeight: "500px" }}>
          {notifications.length > visibleNotifications && (
            <Dropdown.Item onClick={markAllAsRead}>
              Mark All as Read
            </Dropdown.Item>
          )}
          {notifications.slice(0, visibleNotifications).map((notification) => {
            const notificationClass = notification.read_at
              ? "notification-read"
              : "notification-unread";

            const NotificationComponent =
              notification.type ===
              "App\\Notifications\\LikeDislikeNotification" ? (
                notification.data.like.type === "like" ? (
                  <LikeNotification
                    notification={notification}
                    color={notification.read_at == null ? "#ADD8E6" : ""}
                  />
                ) : (
                  <DislikeNotification
                    notification={notification}
                    color={notification.read_at == null ? "#ADD8E6" : ""}
                  />
                )
              ) : notification.type ===
                "App\\Notifications\\CommentNotification" ? (
                <CommentNotification
                  notification={notification}
                  color={notification.read_at == null ? "#ADD8E6" : ""}
                />
              ) : null; // Add other notification types as needed

            return (
              <Dropdown.Item
                key={notification.id}
                className={`notification ${notificationClass}`}
                onClick={() => markAsReadById(notification.id)}
              >
                {NotificationComponent}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
