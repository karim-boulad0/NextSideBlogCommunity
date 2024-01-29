"use client";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { REGISTER, baseUrl } from "@/Api/Api";

import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import { WindowContext } from "@/context/WindowContext";
export default function Register() {
  const { isDark } = useContext(ThemeContext);
  const { windowWidth } = useContext(WindowContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passConfirm: "",
  });
  const [err, setErr] = useState("");
  const [accept, setAccept] = useState(false);

  const cookie = Cookie();
  const Focus = useRef(null);

  //  handle focus
  useEffect(() => {
    form.name.length === 0 ? Focus.current.focus() : console.log();
  }, [form.name.length]);
  // handle form change
  function handleForFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //   submit
  async function handleSubmit(e) {
    setAccept(true);
    e.preventDefault();
    try {
      await axios.post(baseUrl + REGISTER, form).then((data) => {
        const token = data.data.access_token;
        cookie.set("e-commerce", token);
        // nav of location
        window.location.pathname = "/website";
      });
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        setErr("email is already been taken ");
      } else {
        setErr("internal server error");
      }
    }
  }
  return (
    <>
      <div className='parent '>
        <div
          className={
            !isDark
              ? "register-dark container p-5 shadow-lg mb-5 bg-body rounded"
              : "register container p-5 shadow-lg mb-5 bg-body rounded"
          }
          style={{ width: windowWidth < 850 ? "90%" : "60%" }}
        >
          <form onSubmit={handleSubmit}>
            {/* name */}
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='name' className='form-label'>
                name
              </Form.Label>
              <Form.Control
                ref={Focus}
                name='name'
                type='name'
                id='name'
                placeholder='Name'
                onChange={handleForFormChange}
                value={form.name}
              />
            </Form.Group>
            {accept && form.name.length < 2 ? (
              <p className='errMsg'>name cannot be less then 2 char</p>
            ) : null}
            {/* email */}
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='email' className='form-label'>
                Email
              </Form.Label>
              <Form.Control
                name='email'
                type='email'
                id='email'
                placeholder='name@example.com'
                onChange={handleForFormChange}
                value={form.email}
              />
              {accept && err === "" ? null : <p className='errMsg '>{err}</p>}
            </Form.Group>
            {/* password */}
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='pass' className='form-label'>
                Password
              </Form.Label>
              <Form.Control
                name='password'
                type='password'
                id='pass'
                placeholder='Password'
                onChange={handleForFormChange}
                value={form.password}
              />
              {accept && form.password.length < 6 ? (
                <p className='errMsg'>password cannot be less then 2 char</p>
              ) : null}
            </Form.Group>
            {/* password confirmation*/}
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='passC' className='form-label'>
                Confirmation Password
              </Form.Label>
              <Form.Control
                name='passConfirm'
                type='password'
                id='passC'
                placeholder='Confirmation Password'
                onChange={handleForFormChange}
                value={form.passConfirm}
              />
              {accept && form.passConfirm !== form.password ? (
                <p className='errMsg'>password does not match</p>
              ) : null}
            </Form.Group>
            {/* button */}
            <div style={{ textAlign: "center" }}>
              <button className='btn button w-100 ' type='submit'>
                Register
              </button>
            </div>
            {/* google icon for sign in */}
            <div className='google-btn mt-3'>
              <a href={`http://127.0.0.1:8000/login-google`}>
                <div>
                  <Image
                    width={40}
                    height={40}
                    className='border p-2 rounded'
                    alt='sign in with google'
                    src='	https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
                  />
                  <b className='btn btn-success'>Sign In with google</b>
                </div>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
