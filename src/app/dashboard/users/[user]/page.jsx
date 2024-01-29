"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { ReRenderContext } from "@/context/ReRenderContext";
export default function User() {
  const { isAction, setIsAction } = useContext(ReRenderContext);

  const { user } = useParams();
  const [isGet, setIsGet] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const router = useRouter();
  const [auth, setAuth] = useState([]);

  // get auth
  useEffect(() => {
    Axios.get("/global/auth")
      .then((response) => {
        setAuth(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //   get user by id
  useEffect(() => {
    Axios.get(`/dashboard/users/${user}`)
      .then((data) => {
        setIsGet(true);
        setName(data.data.name);
        setEmail(data.data.email);
        setStatus(data.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  // submit data for edit user
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("status", status);
      formData.append("password", password);
      formData.append("photo", photo);
      await Axios.post(`/dashboard/users/edit/${user}`, formData).then(() =>
        auth.status === "admin"
          ? router.push("/dashboard/users")
          : router.push("/dashboard")
      );
      setIsAction((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-100">
      <h1>Edit User</h1>
      <Form className=" w-100  p-2 " onSubmit={handleSubmit}>
        {/* name */}
        <Form.Group>
          <Form.Label htmlFor="name" className="form-label">
            Name
          </Form.Label>
          <Form.Control
            className="form-control"
            name="name"
            type="name"
            id="name"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
        </Form.Group>
        {/* email */}
        <Form.Group>
          <Form.Label htmlFor="email" className="form-label">
            Email
          </Form.Label>
          <Form.Control
            className="form-control"
            name="email"
            type="email"
            id="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </Form.Group>
        {/* password */}
        <Form.Group>
          <Form.Label htmlFor="password" className="form-label">
            password
          </Form.Label>
          <Form.Control
            className="form-control"
            name="password"
            type="password"
            id="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>
        {/*  status */}
        <Form.Group>
          <Form.Label htmlFor="email" className="form-label">
            status
          </Form.Label>
          <Form.Select
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          >
            <option value="" disabled>
              Select status
            </option>
            {auth.status === "admin" && <option value="admin">admin</option>}
            <option value="writer">writer</option>
            <option value="user">user</option>
          </Form.Select>
        </Form.Group>
        {/* photo */}
        {auth.id == user ? (
          <Form.Group>
            <Form.Label htmlFor="photo">photo</Form.Label>
            <Form.Control
              type="file"
              id="photo"
              name="photo"
              onChange={(event) => setPhoto(event.target.files[0])}
            />
          </Form.Group>
        ) : (
          ""
        )}

        {/* button of submit */}
        <div style={{ textAlign: "center" }}>
          <button
            className="btn  w-75 mt-4 text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
            type="submit"
            disabled={!isGet & true}
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
