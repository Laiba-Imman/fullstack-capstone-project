import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {

  return (
    <main className="page landing">

      <section className="card hero">

        <p className="eyebrow">
          WELCOME TO GIFTLINK
        </p>

        <h1>
          Give. Reuse. Connect.
        </h1>

        <p className="description">
          GiftLink connects people who want to give away
          useful household items with people who prefer
          free, reusable and sustainable choices.
        </p>

        <Link
          to="/gifts"
          className="button"
        >
          Get Started
        </Link>

      </section>

    </main>
  );
}