import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page empty-page">
      <p className="eyebrow">404</p>
      <h1>That page isn't here.</h1>
      <Link to="/" className="button primary">Go home</Link>
    </section>
  );
}