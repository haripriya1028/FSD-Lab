import React from "react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useItems } from "../context/ItemsContext";

function scoreMatch(a, b) {
  let score = 0;
  if (a.category === b.category) score += 30;
  if (a.color && b.color && a.color.toLowerCase() === b.color.toLowerCase()) score += 20;
  if (a.location === b.location) score += 25;

  const aDate = new Date(a.date);
  const bDate = new Date(b.date);
  const dayDiff = Math.abs(aDate - bDate) / 86400000;
  if (dayDiff <= 1) score += 15;
  else if (dayDiff <= 3) score += 8;

  const aWords = `${a.name} ${a.description} ${a.features}`.toLowerCase().split(/\W+/);
  const bWords = `${b.name} ${b.description} ${b.features}`.toLowerCase().split(/\W+/);
  const overlap = aWords.filter((word) => word.length > 3 && bWords.includes(word));
  if (overlap.length >= 2) score += 10;
  else if (overlap.length === 1) score += 5;

  return Math.min(score, 100);
}

export default function ItemDetails() {
  const { id } = useParams();
  const { items, updateItem } = useItems();
  const item = items.find((entry) => entry.id === id);
  const [claimed, setClaimed] = useState(false);

  const matches = useMemo(() => {
    if (!item) return [];
    return items
      .filter((entry) => entry.id !== item.id && entry.type !== item.type && entry.status !== "Returned")
      .map((entry) => ({ item: entry, score: scoreMatch(item, entry) }))
      .filter((entry) => entry.score >= 35)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [item, items]);

  if (!item) {
    return (
      <section className="page empty-page">
        <h1>Report not found</h1>
        <Link className="button primary" to="/browse">Back to browse</Link>
      </section>
    );
  }

  function markReturned() {
    updateItem(item.id, { status: "Returned" });
  }

  return (
    <section className="page detail-page">
      <Link to="/browse" className="back-link">← Back to all reports</Link>

      <div className="detail-layout">
        <div className={`detail-visual ${item.type}`}>
          {item.image ? <img src={item.image} alt={item.name} /> : <span>{item.type === "lost" ? "?" : "✓"}</span>}
        </div>

        <div className="detail-info">
          <div className="card-topline">
            <span className={`type-pill ${item.type}`}>{item.type === "lost" ? "Lost item" : "Found item"}</span>
            <span className="item-date">Report {item.id}</span>
          </div>

          <h1>{item.name}</h1>
          <p className="detail-description">{item.description}</p>

          <div className="detail-facts">
            <div><span>Category</span><strong>{item.category}</strong></div>
            <div><span>Colour</span><strong>{item.color || "Not specified"}</strong></div>
            <div><span>Location</span><strong>{item.location}</strong></div>
            <div><span>Date</span><strong>{new Date(`${item.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></div>
          </div>

          {item.features && (
            <div className="feature-note">
              <span>Distinctive feature</span>
              <strong>{item.features}</strong>
            </div>
          )}

          {item.type === "found" && item.status !== "Returned" && !claimed && (
            <div className="claim-box">
              <div>
                <strong>Think this belongs to you?</strong>
                <p>Before claiming, make sure you can describe the item accurately.</p>
              </div>
              <button className="button primary" onClick={() => setClaimed(true)}>Request to claim</button>
            </div>
          )}

          {claimed && (
            <div className="success-box">
              <strong>Claim request recorded</strong>
              <p>For the class demo, this request is stored in the current browser session. An admin would verify ownership before the item is returned.</p>
            </div>
          )}

          {item.status !== "Returned" && (
            <button className="text-button" onClick={markReturned}>MARK AS RETURNED</button>
          )}
        </div>
      </div>

      {matches.length > 0 && (
        <section className="matches-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SMART MATCH</p>
              <h2>Possible matches</h2>
            </div>
            <span className="muted">Based on item details</span>
          </div>

          <div className="match-list">
            {matches.map(({ item: match, score }) => (
              <Link to={`/item/${match.id}`} className="match-card" key={match.id}>
                <div className={`match-thumb ${match.type}`}>
                  {match.image ? <img src={match.image} alt="" /> : <span>{match.type === "lost" ? "?" : "✓"}</span>}
                </div>
                <div>
                  <span className={`type-pill ${match.type}`}>{match.type}</span>
                  <h3>{match.name}</h3>
                  <p>{match.location} · {match.color || "Colour not specified"}</p>
                </div>
                <div className="match-score">
                  <strong>{score}%</strong>
                  <span>match</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}