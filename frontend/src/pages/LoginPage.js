import React, { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

const API_URL =
 import.meta.env.VITE_API_URL ||
"http://localhost:5000";

export default function LoginPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");


  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            // REQUIRED BY TASK 10
            "Authorization":
              `Bearer ${localStorage.getItem("token") || ""}`
          },

          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
          "Login failed"
        );

        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/gifts");

    } catch (error) {

      setMessage(
        "Could not connect to server"
      );

    }
  }


  return (

    <main className="page">

      <section className="card form-card">

        <h2>
          Login to GiftLink
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            required
          />

          <button
            className="button"
            type="submit"
          >
            Login
          </button>

        </form>

        <p>{message}</p>

        <Link to="/register">
          Create an account
        </Link>

      </section>

    </main>
  );
}