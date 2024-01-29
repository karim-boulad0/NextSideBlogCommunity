"use client";
import React, { useState, useEffect, useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { Axios } from "@/Api/Axios";
import { Modal } from "react-bootstrap";
import { PostContext } from "@/context/PostContext";

export default function Comments({ post }) {
  const { setIsChange } = useContext(PostContext);

  const [auth, setAuth] = useState([]);
  useEffect(() => {
    Axios.get("/global/auth")
      .then((res) => setAuth(res.data))
      .then((err) => console.log(err));
  }, []);
  const [showAllComments, setShowAllComments] = useState(false);
  const reversedComments = [...post?.comments].reverse();
  const visibleComments = showAllComments
    ? reversedComments
    : reversedComments.slice(0, 4);

  const handleShowMore = () => {
    setShowAllComments(true);
  };

  const handleShowLess = () => {
    setShowAllComments(false);
  };

  const formatRelativeTime = (dateString) => {
    const formattedDate = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });
    return formattedDate;
  };
  // ---------------------------------handle delete and edit comment -------------------------
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const handleShow = (commentId) => {
    setSelectedCommentId(commentId);
    setShow(true);
  };
  const [comment, setComment] = useState([]);
  useEffect(() => {
    Axios.get(`/website/comments/comment/${selectedCommentId}`)
      .then((res) => {
        setComment(res.data);
        setContent(res.data.content);
      })
      .then((err) => console.log(err));
  }, [selectedCommentId]);
  // ---------------------------------handle delete and edit comment -------------------------

  async function handleDelete() {
    try {
      setIsChange((prev) => prev + 1);
      await Axios.delete(`/website/comments/${selectedCommentId}`);
    } catch (err) {
      console.log(errorToJSON);
    }
  } //
  const [content, setContent] = useState([]);
  async function handleEdit() {
    try {
      setIsChange((prev) => prev + 1);

      const res = await Axios.post(`/website/comments/${selectedCommentId}`, {
        post_id: selectedCommentId,
        content: content,
      });
    } catch (err) {
      console.log(errorToJSON);
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const showModal = (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Edit or Delete Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control w-50 h-25 mt-2"
          placeholder="edit Comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div
      style={{
        maxHeight: showAllComments ? "none" : "500px",
        overflow: "hidden",
      }}
    >
      {visibleComments.map((comment) => (
        <div key={comment?.id} style={{ marginBottom: "5px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start", // Align items to the top
              marginBottom: "4px", // Adjusted margin between comments
            }}
          >
            <img
              src={comment?.user.photo}
              alt={`${comment?.user.name}'s profile`}
              style={{
                width: "36px", // Reduced profile picture size
                height: "36px", // Reduced profile picture size
                borderRadius: "50%",
                marginRight: "8px", // Adjusted margin between profile picture and content
              }}
            />
            <div className="d-flex justify-content-between w-100">
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "2px",
                    fontSize: "14px",
                  }}
                >
                  {comment?.user.name}
                </p>
                <p style={{ fontSize: "13px", marginBottom: 0 }}>
                  {comment?.content}
                </p>
                <p style={{ fontSize: "11px", color: "#555" }}>
                  {formatRelativeTime(comment?.updated_at)}
                </p>
              </div>
              {auth?.id === comment?.user?.id && (
                <div>
                  <h1
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShow(comment.id)}
                  >
                    ...
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {post?.comments.length > 4 && (
        <div style={{ textAlign: "center", marginTop: "5px" }}>
          {!showAllComments ? (
            <span
              style={{ cursor: "pointer", color: "blue", fontSize: "14px" }}
              onClick={handleShowMore}
            >
              Show More
            </span>
          ) : (
            <span
              style={{ cursor: "pointer", color: "blue", fontSize: "14px" }}
              onClick={handleShowLess}
            >
              Show Less
            </span>
          )}
        </div>
      )}
      {showModal}
    </div>
  );
}
