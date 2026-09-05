import React, {
  useEffect,
  useState
} from "react";

import { Link } from "react-router-dom";

const API_URL =
 import.meta.env.VITE_API_URL ||
"http://localhost:5000";

export default function GiftsPage() {

  const [items, setItems] = useState([]);

  const [category, setCategory] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  async function loadItems() {

    setLoading(true);

    const params =
      new URLSearchParams();

    if (category) {
      params.set(
        "category",
        category
      );
    }

    if (search) {
      params.set(
        "search",
        search
      );
    }

    try {

      const response =
        await fetch(
          `${API_URL}/api/search?${params.toString()}`
        );

      const data =
        await response.json();

      setItems(data);

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {

    loadItems();

  }, []);


  return (

    <main className="page">

      <h1>
        Available Gifts
      </h1>


      <div className="filters">

        <input
          className="input"
          placeholder="Search items..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <select
          className="input"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="">
            All Categories
          </option>

          <option value="Furniture">
            Furniture
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Kitchen">
            Kitchen
          </option>

          <option value="Clothing">
            Clothing
          </option>

          <option value="Home">
            Home
          </option>

          <option value="Sports">
            Sports
          </option>

          <option value="Bags">
            Bags
          </option>

        </select>


        <button
          className="button"
          onClick={loadItems}
        >
          Search
        </button>

      </div>


      {loading ? (

        <p>Loading...</p>

      ) : (

        <div className="grid">

          {items.map((item) => (

            <article
              className="card"
              key={item._id}
            >

              <p>
                {item.category}
              </p>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

              <p>
                <b>Condition:</b>{" "}
                {item.condition}
              </p>

              <Link
                to={`/gifts/${item._id}`}
              >
                View Details
              </Link>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}