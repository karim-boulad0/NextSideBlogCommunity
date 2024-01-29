"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // submit data for edit user
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`/dashboard/users/add`, {
        name: name,
        email: email,
        status: status,
        password: password,
      }).then(() => router.push("/dashboard/users"));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='w-100'>
      <h1>Add User</h1>
      <Form className=' w-100  p-2 ' onSubmit={handleSubmit}>
        {/* name */}
        <Form.Group>
          <Form.Label htmlFor='name' className='form-label'>
            Name
          </Form.Label>
          <Form.Control
            className='form-control'
            name='name'
            type='name'
            id='name'
            placeholder='Name'
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
        </Form.Group>
        {/* email */}
        <Form.Group>
          <Form.Label htmlFor='email' className='form-label'>
            Email
          </Form.Label>
          <Form.Control
            className='form-control'
            name='email'
            type='email'
            id='email'
            placeholder='email'
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </Form.Group>
        {/* password */}
        <Form.Group>
          <Form.Label htmlFor='password' className='form-label'>
            password
          </Form.Label>
          <Form.Control
            className='form-control'
            name='password'
            type='password'
            id='password'
            placeholder='password'
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>
        {/*  status */}
        <Form.Group>
          <Form.Label htmlFor='email' className='form-label'>
            status
          </Form.Label>
          <Form.Select
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          >
            <option value='' disabled>
              Select status
            </option>
            <option value='admin'>admin</option>
            <option value='writer'>writer</option>
            <option value='user'>user</option>
          </Form.Select>
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
