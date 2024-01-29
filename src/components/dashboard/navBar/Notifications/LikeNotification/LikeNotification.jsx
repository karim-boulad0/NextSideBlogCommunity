// LikeNotification.js

import React from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Axios } from "@/Api/Axios"; // Import Axios from your API file

const LikeNotification = ({ notification, color, border }) => {
  const formattedDate = formatDistanceToNow(
    new Date(notification.data.like.updated_at),
    {
      addSuffix: true,
    }
  );

  const markAsRead = async () => {
    try {
      res = await Axios.post(
        `/dashboard/admin/notifications/markAsReadById/${notification.id}`
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link
      href={`#`}
      style={{
        color: "inherit",
        textDecoration: "none",
      }}
      onClick={markAsRead}
    >
      <div className={"notification " + (border && "notificationIsBorder")}>
        <div
          className="notification-content"
          style={{ backgroundColor: color }}
        >
          <span className="notification-type">Like</span>
          <div className="notification-details">
            <img
              src={notification.data.user.photo}
              alt={notification.data.user.name}
            />
            <div className="user-info">
              <p>{notification.data.user.name} liked your post</p>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LikeNotification;
