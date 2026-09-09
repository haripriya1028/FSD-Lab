import React from "react";
import { Link } from "react-router-dom";
import { useItems } from "../context/ItemsContext";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const { items } = useItems();

  const activeLost = items.filter((i) => i.type === "lost" && i.status !== "Returned").length;
  const found = items.filter((i) => i.type === "found" && i.status !== "Returned").length;
  const returned = items.filter((i) => i.status === "Returned").length;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CAMPUS LOST & FOUND</p>
          <h1>Lost something?<br /><em>Let’s find it.</em></h1>
          <p className="hero-text">
            A simple place for students to report lost items, post things they’ve found,
            and reconnect with what matters.
          </p>
          <div className="hero-buttons">
            <Link to="/browse" className="button primary">Browse items</Link>
            <Link to="/report" className="button secondary">Report an item</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-header">
            <span>Recently reported</span>
            <Link to="/browse">View all</Link>
          </div>
          {items.slice(0, 3).map((item) => (
            <Link to={`/item/${item.id}`} className="mini-item" key={item.id}>
              <div className={`mini-icon ${item.type}`}>
                {item.type === "lost" ? "?" : "✓"}
              </div>
              <div>
                <strong>{item.name}</strong>
                <span>{item.location}</span>
              </div>
              <span className="mini-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="stats-strip">
        <div><strong>{activeLost}</strong><span>Active lost reports</span></div>
        <div><strong>{found}</strong><span>Items found</span></div>
        <div><strong>{returned}</strong><span>Items returned</span></div>
        <div><strong>24/7</strong><span>Browse & report</span></div>
      </section>

      <section className="section recent-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT'S NEW</p>
            <h2>Recently reported</h2>
          </div>
          <Link to="/browse" className="text-link">See all items →</Link>
        </div>

        <div className="item-grid">
          {items.slice(0, 4).map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="how-section">
        <div>
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>Three steps.<br />One less thing to worry about.</h2>
        </div>
        <div className="steps">
          <div className="step">
            <span>01</span>
            <h3>Report</h3>
            <p>Tell the campus what you lost or found. Add the details that make the item recognisable.</p>
          </div>
          <div className="step">
            <span>02</span>
            <h3>Match</h3>
            <p>Browse reports and use filters to narrow down possible matches.</p>
          </div>
          <div className="step">
            <span>03</span>
            <h3>Reconnect</h3>
            <p>Open the report, verify the details and arrange a safe return.</p>
          </div>
        </div>
      </section>
    </>
  );
}