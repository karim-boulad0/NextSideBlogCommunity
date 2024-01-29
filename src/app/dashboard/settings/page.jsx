"use client";
import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Axios } from "@/Api/Axios";
import Image from "next/image";
import { Loading } from "@/components/loading/Loading";
import { ReRenderContext } from "@/context/ReRenderContext";

export default function Settings({ updateSettings }) {
  const { isAction, setIsAction } = useContext(ReRenderContext);
  const [settingData, setSettingData] = useState([]);
  const [icon, setIcon] = useState();
  const [logo, setLogo] = useState();
  const [action, setAction] = useState(0);
  const [formData, setFormData] = useState([]);
  const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);

  useEffect(() => {
    Axios.get("/global/settings")
      .then((response) => {
        setSettingData(response.data);
        setFormData({
          title: response.data.title || "",
          site_name: response.data.site_name || "",

          phone_number: response.data.phone_number || "",
          facebook: response.data.facebook || "",
          instagram: response.data.instagram || "",
          twitter: response.data.twitter || "",
          linkedin: response.data.linkedin || "",
          email: response.data.email || "",
        });
      })
      .catch((err) => console.log(err));
  }, [action, isAction]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSuccessUpdate(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("site_name", formData.site_name);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("facebook", formData.facebook);
      formDataToSend.append("instagram", formData.instagram);
      formDataToSend.append("twitter", formData.twitter);
      formDataToSend.append("linkedin", formData.linkedin);
      formDataToSend.append("email", formData.email);
      if (icon) {
        formDataToSend.append("icon", icon); // Append the file here
      }

      if (logo) {
        formDataToSend.append("logo", logo); // Append the file here
      }

      setIsAction((prev) => prev + 1);
      await Axios.post("/dashboard/settings/edit", formDataToSend);
      updateSettings();
      setAction((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div className="mt-3 container">
      <h1>
        Settings
        {isSuccessUpdate ? (
          <p className="alert alert-primary">success update settings</p>
        ) : (
          ""
        )}
      </h1>
      <Form onSubmit={handleFormSubmit}>
        {/* Input fields for each setting */}
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Icon:</Form.Label>
          <Form.Control
            type="file"
            name="icon"
            id="icon"
            onChange={(event) => setIcon(event.target.files[0])}
          />
          {settingData?.icon && (
            <Image
              width={50}
              height={50}
              src={settingData?.icon}
              alt={`${settingData?.icon}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>logo:</Form.Label>
          <Form.Control
            type="file"
            name="logo"
            id="logo"
            onChange={(event) => setLogo(event.target.files[0])}
          />
          {settingData?.logo && (
            <Image
              width={50}
              height={50}
              src={settingData?.logo}
              alt={`${settingData?.logo}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Site Name:</Form.Label>
          <Form.Control
            type="text"
            name="site_name"
            value={formData.site_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* ---------------------- */}
        <Form.Group>
          <Form.Label>facebook:</Form.Label>
          <Form.Control
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* ---------------------- */}
        <Form.Group>
          <Form.Label>instagram:</Form.Label>
          <Form.Control
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* ---------------------- */}
        <Form.Group>
          <Form.Label>twitter:</Form.Label>
          <Form.Control
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* ---------------------- */}
        <Form.Group>
          <Form.Label>linkedin:</Form.Label>
          <Form.Control
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button
          className="m-3"
          type="submit"
          style={{
            backgroundColor: "var(--color-primary)",
            border: "solid 2px var(--color-primary)",
          }}
        >
          Update Settings
        </Button>
      </Form>
    </div>
  );
}
