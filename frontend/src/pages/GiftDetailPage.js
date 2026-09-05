import React, {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

const API_URL =
 import.meta.env.VITE_API_URL ||
"http://localhost:5000";

export default function GiftDetailPage() {

  const { id } = useParams();

  const [item, setItem] =
    useState(null);

  const [message, setMessage] =
    useState("Loading...");


  useEffect(() => {

    fetch(
      `${API_URL}/api/gifts/${id}`
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {

        if (data.message) {

          setMessage(
            data.message
          );

        } else {

          setItem(data);

        }

      })
      .catch(() => {

        setMessage(
          "Could not load item"
        );

      });

  }, [id]);


  if (!item) {

    return (
      <main className="page">
        {message}
      </main>
    );

  }


  return (

    <main className="page">

      <section className="card detail">

        <p>
          {item.category}
        </p>

        <h1>
          {item.title}
        </h1>

        <p>
          {item.description}
        </p>

        <p>
          <b>Condition:</b>{" "}
          {item.condition}
        </p>

        <p>
          <b>Location:</b>{" "}
          {item.location}
        </p>

        <p>
          <b>Owner:</b>{" "}
          {item.ownerName}
        </p>

      </section>

    </main>
  );
}