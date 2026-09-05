import React, {
  useState
} from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
"http://localhost:5000";

export default function ProfilePage() {

  const storedUser =
    JSON.parse(
      localStorage.getItem("user") ||
      "null"
    );

  const [name, setName] =
    useState(
      storedUser?.name || ""
    );

  const [email, setEmail] =
    useState(
      storedUser?.email || ""
    );

  const [message, setMessage] =
    useState("");


  async function updateProfile(event) {

    event.preventDefault();

    if (!storedUser?.id) {

      setMessage(
        "Please login first."
      );

      return;
    }


    const response =
      await fetch(
        `${API_URL}/api/auth/${storedUser.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            "Authorization":
              `Bearer ${
                localStorage.getItem(
                  "token"
                ) || ""
              }`
          },

          body: JSON.stringify({
            name,
            email
          })
        }
      );


    const data =
      await response.json();

    setMessage(
      data.message ||
      "Profile updated"
    );


    if (data.user) {

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

    }
  }


  return (

    <main className="page">

      <section className="card form-card">

        <h2>
          Edit Profile
        </h2>

        <form
          onSubmit={updateProfile}
        >

          <input
            className="input"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Name"
          />

          <input
            className="input"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
          />

          <button
            className="button"
            type="submit"
          >
            Save Changes
          </button>

        </form>

        <p>{message}</p>

      </section>

    </main>
  );
}