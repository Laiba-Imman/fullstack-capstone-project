import React, { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

const API_URL =
 import.meta.env.VITE_API_URL ||
"http://localhost:5000";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");


  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
          "Registration failed"
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
          Create GiftLink Account
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            required
          />

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
            Register
          </button>

        </form>

        <p>{message}</p>

        <Link to="/login">
          Already have an account? Login
        </Link>

      </section>

    </main>
  );
}