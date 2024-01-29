"use client";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { LOGIN, baseUrl } from "@/Api/Api";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import { WindowContext } from "@/context/WindowContext";
export default function Login() {
  const { windowWidth } = useContext(WindowContext);
  const { isDark } = useContext(ThemeContext);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isShow, setIsShow] = useState(false);
  const [accept, setAccept] = useState(false);

  const Focus = useRef(null);

  const cookie = Cookie();

  // handle focus
  useEffect(() => {
    form.email.length === 0 ? Focus.current.focus() : console.log();
  }, [form.email.length]);

  // handle form change
  function handleForFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //   handle submit
  async function submit(e) {
    setAccept(true);
    e.preventDefault();
    try {
      await axios.post(baseUrl + LOGIN, form).then((data) => {
        const token = data.data.token;
        cookie.set("e-commerce", token);
        data.data.user.status === "user"
          ? (window.location.pathname = "/website")
          : (window.location.pathname = "/dashboard");
      });
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        setErr("email is already been taken ");
      } else {
        if (err.response.status === 422 || err.response.status === 401) {
          setErr("wrong email or password");
        } else {
          setErr("internal server error");
        }
      }
    }
  }
  return (
    <>
      <div className='parent '>
        <div
          className={
            !isDark
              ? "login-dark container p-5 shadow-lg mb-5 bg-body rounded"
              : "login container p-5 shadow-lg mb-5 bg-body rounded"
          }
          style={{ width: windowWidth < 850 ? "90%" : "60%" }}
        >
          <Form className='' onSubmit={submit}>
            {/* email */}
            <Form.Group className='mb-3 '>
              <Form.Label htmlFor='email' className='form-label'>
                Email
              </Form.Label>
              <Form.Control
                ref={Focus}
                name='email'
                type='email'
                id='email'
                placeholder='name@example.com'
                onChange={handleForFormChange}
                value={form.email}
              />
            </Form.Group>
            {/* password */}
            <Form.Group className='mb-3 pass-group'>
              <Form.Label htmlFor='pass' className='form-label pass-label'>
                Password
              </Form.Label>
              <Form.Control
                className='pass-input'
                name='password'
                type={isShow ? "text" : "password"}
                id='pass'
                placeholder='Password'
                onChange={handleForFormChange}
                value={form.password}
              />

              <FontAwesomeIcon
                onClick={() => setIsShow((prev) => !prev)}
                className='pass-icon'
                icon={isShow ? faEyeSlash : faEye}
              />
            </Form.Group>

            {err && accept ? (
              <p className='errMsg'>wrong email or password</p>
            ) : null}
            {/* button */}
            <div style={{ textAlign: "center" }}>
              <button className='button btn  w-50' type='submit'>
                Login
              </button>
            </div>

            {/* google icon for sign in */}
            <div className='google-btn mt-3'>
              <a href={`http://127.0.0.1:8000/login-google`}>
                <div>
                  <Image
                    className='border p-2 rounded'
                    width={40}
                    height={40}
                    alt='sign in with google'
                    src='	https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
                  />
                  <b className='btn btn-success'>Sign In with google</b>
                </div>
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
