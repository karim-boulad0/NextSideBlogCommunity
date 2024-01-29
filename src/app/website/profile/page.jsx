"use client";

import { useParams } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import { Axios } from "@/Api/Axios";
import { Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ReRenderContext } from "@/context/ReRenderContext";
export default function Profile() {
  const { isAction, setIsAction } = useContext(ReRenderContext);

  const { user } = useParams();
  const [isGet, setIsGet] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [IsChanged, setIsChanged] = useState("");

  const router = useRouter();

  //   get user by id
  useEffect(() => {
    Axios.get("/global/auth")
      .then((data) => {
        setIsGet(true);
        setName(data.data.name);
        setEmail(data.data.email);
        setImage(data.data.photo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, IsChanged, isAction]);
  // submit data for edit user
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("photo", photo);
      await Axios.post(`/website/user/edit`, formData).then(() =>
        setIsAction((prev) => prev + 1)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div
        className="cardImage shadow-sm"
        style={{ position: "relative", display: "inline-block" }}
      >
        <label
          htmlFor="photo"
          style={{ position: "relative", display: "block" }}
        >
          <Image
            src={image ? image : "http://127.0.0.1"}
            width={200}
            height={200}
            alt={"none"}
            style={{ borderRadius: "100%" }}
          />
          <FontAwesomeIcon
            icon={faCamera}
            style={{
              position: "absolute",
              top: "84%",
              left: "83%",
              transform: "translate(-50%, -50%)",
              fontSize: "24px",
              color: "white", // Set the color you want
              cursor: "pointer", // Add this if you want a pointer cursor
              color: "var(--color-primary)",
            }}
          />
        </label>
      </div>
      <div className="w-100">
        <h1>My Profile</h1>
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

          {/* photo */}
          <Form.Group>
            {/* <Form.Label htmlFor='photo'>photo</Form.Label> */}
            <Form.Control
              type="file"
              id="photo"
              name="photo"
              onChange={(event) => setPhoto(event.target.files[0])}
              style={{ display: "none" }}
            />
          </Form.Group>

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
    </div>
  );
}
