import React from "react";
import { Link } from "react-router-dom";

const categoryIcons = {
  Electronics: "▣",
  Wallets: "◇",
  Documents: "▤",
  Study: "□",
  Accessories: "○",
  Clothing: "△",
  Other: "•"
};

export default function ItemCard({ item }) {
  const icon = categoryIcons[item.category] || "•";

  return (
    <Link to={`/item/${item.id}`} className="item-card">
      <div className={`item-thumb ${item.type}`}>
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <span>{icon}</span>
        )}
      </div>

      <div className="item-card-body">
        <div className="card-topline">
          <span className={`type-pill ${item.type}`}>
            {item.type === "lost" ? "Lost" : "Found"}
          </span>
          <span className="item-date">{formatDate(item.date)}</span>
        </div>

        <h3>{item.name}</h3>
        <p className="muted">{item.category} · {item.color}</p>
        <p className="location">⌖ {item.location}</p>
      </div>
    </Link>
  );
}

function formatDate(value) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
}