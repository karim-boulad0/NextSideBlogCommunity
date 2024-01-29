"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  // submit data for edit user
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      await Axios.post(`/dashboard/categories/add`, formData).then(() =>
        router.push("/dashboard/categories")
      );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-100">
      <h1>Add Category</h1>
      <Form className=" w-100  p-2 " onSubmit={handleSubmit}>
        {/* title */}
        <Form.Group>
          <Form.Label htmlFor="title" className="form-label">
            title
          </Form.Label>
          <Form.Control
            className="form-control"
            name="title"
            type="text"
            id="title"
            placeholder="title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            required
          />
        </Form.Group>
        {/*  content */}
        <Form.Group>
          <Form.Label htmlFor="content" className="form-label">
            content
          </Form.Label>
          <Form.Control
            className="form-control"
            name="content"
            type="text"
            id="content"
            placeholder="content"
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
        </Form.Group>
        {/* image */}
        <Form.Group>
          <Form.Label htmlFor="image">Image</Form.Label>
          <Form.Control
            type="file"
            id="image"
            name="image"
            required
            onChange={(event) => setImage(event.target.files[0])}
          />
        </Form.Group>
        {/* button of submit */}
        <div style={{ textAlign: "center" }}>
          <button
            className="btn  w-75 mt-4 text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
