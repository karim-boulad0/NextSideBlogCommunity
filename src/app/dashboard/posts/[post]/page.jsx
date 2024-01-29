"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
export default function AddPost() {
  const [Post, setPost] = useState([]);
  const { post } = useParams();
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [form, setForm] = useState({
    category_id: "select category",
    title: "",
    image: "",
    content: "",
    smallDesc: "",
    tags: "",
  });
  // get categories
  useEffect(() => {
    Axios.get("/dashboard/categories")
      .then((response) => setCategories(response.data))
      .catch((err) => console.log(err));
  }, []);
  // get posts
  useEffect(() => {
    Axios.get(`/dashboard/posts/${post}`)
      .then((response) => {
        setForm(response.data);
      })
      .catch((err) => console.log(err));
  }, [post]);
  // handle form change
  function handleForFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // submit data for edit user
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category_id", form.category_id);
      formData.append("title", form.title);
      if (e.target.elements.image.files[0]) {
        formData.append("image", e.target.elements.image.files[0]);
      }
      formData.append("content", form.content);
      formData.append("smallDesc", form.smallDesc);
      formData.append("tags", form.tags);

      await Axios.post(`/dashboard/posts/edit/${post}`, formData).then(() =>
        router.push("/dashboard/posts")
      );
    } catch (err) {
      console.log(err);
    }
  }
  //  Map  data of categories
  const ShowCategories = categories.map((item, index) => (
    <option key={index} value={item.id}>
      {item.title}
    </option>
  ));
  return (
    <div className='w-100'>
      <h1>Add User</h1>
      <Form className=' w-100  p-2 ' onSubmit={handleSubmit}>
        {/* category */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='category_id' className='form-label'>
            category
          </Form.Label>
          <Form.Select
            name='category_id'
            id='category_id'
            onChange={handleForFormChange}
            value={form.category_id}
          >
            <option disabled>select category</option>
            {ShowCategories}
          </Form.Select>
        </Form.Group>
        {/* title */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='title' className='form-label'>
            title
          </Form.Label>
          <Form.Control
            name='title'
            type='text'
            id='title'
            onChange={handleForFormChange}
            value={form.title}
          />
        </Form.Group>
        {/* content */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='content' className='form-label'>
            content
          </Form.Label>
          <Form.Control
            name='content'
            type='text'
            id='content'
            onChange={handleForFormChange}
            value={form.content}
          />
        </Form.Group>
        {/* smallDesc */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='smallDesc' className='form-label'>
            smallDesc
          </Form.Label>
          <Form.Control
            name='smallDesc'
            type='text'
            id='smallDesc'
            onChange={handleForFormChange}
            value={form.smallDesc}
          />
        </Form.Group>
        {/* tags */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='tags' className='form-label'>
            tags
          </Form.Label>
          <Form.Control
            name='tags'
            type='text'
            id='tags'
            onChange={handleForFormChange}
            value={form.tags}
          />
        </Form.Group>
        {/* image */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='image' className='form-label'>
            image
          </Form.Label>
          <Form.Control
            name='image'
            type='file'
            id='image'
            onChange={handleForFormChange}
          />
        </Form.Group>
        {/* button of submit */}
        <div style={{ textAlign: "center" }}>
          <button
            className='btn  w-75 mt-4 text-white'
            style={{ backgroundColor: "var(--color-primary)" }}
            type='submit'
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
