// CommentNotification.js

import React from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Axios } from "@/Api/Axios";

const CommentNotification = ({ notification, color, border }) => {
  const formattedDate = formatDistanceToNow(
    new Date(notification.data.comment.updated_at),
    {
      addSuffix: true,
    }
  );

  // Display a portion of the comment content
  const shortCommentContent =
    notification.data.comment.content.length > 23
      ? notification.data.comment.content.substring(0, 23) + "..."
      : notification.data.comment.content;
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
      href={`/website/posts/${notification.data.post.id}`}
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
          <span className="notification-type">Comment</span>
          <div className="notification-details">
            <img
              src={notification.data.user.photo}
              alt={notification.data.user.name}
            />
            <div className="user-info">
              <p>
                {notification.data.user.name} commented: "{shortCommentContent}"
              </p>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CommentNotification;
