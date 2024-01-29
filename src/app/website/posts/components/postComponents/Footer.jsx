"use client ";
import { Axios } from "@/Api/Axios";
import {
  faThumbsDown,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Comments from "./Comments";
import { PostContext } from "@/context/PostContext";
import { useRouter } from "next/navigation";

export default function Footer({ post, isDark }) {
  const router = useRouter();
  const { isChange, setIsChange } = useContext(PostContext);
  // handle like
  async function handleLike(id) {
    try {
      const res = await Axios.post("/website/likes/interact", {
        post_id: id,
        type: "like",
      });
      setIsChange((prev) => prev + 1);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        router.push("/");
      }
      console.log(err);
    }
  }
  // handle dislike
  async function handleDislike(id) {
    try {
      const res = await Axios.post("/website/likes/interact", {
        post_id: id,
        type: "dislike",
      });
      setIsChange((prev) => prev + 1);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        router.push("/");
      }
      console.log(err);
    }
  }

  /*------------------------- handle comment modal---------------------------------*/
  /*-----------------------------------------------------------------------*/
  const [comment, setComment] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
  };
  // handle comment
  async function handleComment(id) {
    try {
      const res = await Axios.post("/website/comments/add", {
        post_id: id,
        content: comment,
      });
      handleClose();
      setIsChange((prev) => prev + 1);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        router.push("/");
      }
      console.log(err);
    }
  }
  const commentModal = (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: !isDark ? "var(--color-dark-layout)" : "white",
            color: !isDark ? "white" : "black",
          }}
        >
          <Modal.Title>Add New Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: !isDark ? "var(--color-dark-layout)" : "white",
            color: !isDark ? "white" : "black",
            maxHeight: "100vh",
            overflowX: "hidden", // Set overflowX to hidden to prevent horizontal scrollbar
          }}
        >
          <Comments post={post} />
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: !isDark ? "var(--color-dark-layout)" : "white",
            color: !isDark ? "white" : "black",
          }}
          className="d-flex"
        >
          <div className="container mt-4">
            <input
              type="text"
              id="commentInput"
              className="form-control rounded"
              onChange={(e) => setComment(e.target.value)}
              placeholder="write a comment..."
              value={comment}
            />
          </div>
          <div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
          <div>
            <Button variant="primary" onClick={() => handleComment(post?.id)}>
              add Comment
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
  useEffect(() => {}, [isChange]);
  return (
    <div className="footer d-flex gap-2">
      <div
        className="interect p-3  rounded w-75 text-center "
        style={{ cursor: "pointer" }}
        onClick={() => handleLike(post?.id)}
      >
        <FontAwesomeIcon
          icon={faThumbsUp}
          style={{
            width: "30px",
            height: "30px",
          }}
        />
        {post?.likes_count}
      </div>

      <div
        className="interect p-3  rounded w-75 text-center "
        style={{ cursor: "pointer" }}
        onClick={() => handleDislike(post?.id)}
      >
        <FontAwesomeIcon
          icon={faThumbsDown}
          style={{
            width: "30px",
            height: "30px",
          }}
        />
        {post?.dislikes_count}
      </div>

      <div
        className="interect p-3  rounded w-75 text-center "
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        <FontAwesomeIcon
          icon={faComment}
          style={{
            width: "30px",
            height: "30px",
          }}
        />
        {post?.comments_count}
      </div>
      {commentModal}
    </div>
  );
}
