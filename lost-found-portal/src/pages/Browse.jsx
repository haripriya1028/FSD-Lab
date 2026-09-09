import React from "react";
import { useMemo, useState } from "react";
import { useItems } from "../context/ItemsContext";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";

const locations = [
  "All locations", "Central Library", "Main Canteen", "Block B",
  "Engineering Block", "Sports Complex", "Auditorium"
];

const categories = [
  "All categories", "Electronics", "Wallets", "Documents",
  "Study", "Accessories", "Clothing", "Other"
];

export default function Browse() {
  const { items } = useItems();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("All categories");
  const [location, setLocation] = useState("All locations");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);

      const matchesType = type === "all" || item.type === type;
      const matchesCategory = category === "All categories" || item.category === category;
      const matchesLocation = location === "All locations" || item.location === location;

      return matchesQuery && matchesType && matchesCategory && matchesLocation;
    });
  }, [items, query, type, category, location]);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">CAMPUS LISTINGS</p>
          <h1>Browse lost & found</h1>
          <p>Search through recent reports from around campus.</p>
        </div>
        <div className="result-count"><strong>{filtered.length}</strong> results</div>
      </div>

      <div className="filters">
        <div className="search-box">
          <span>⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search an item, location or keyword..."
          />
        </div>

        <div className="filter-row">
          <div className="segmented">
            <button className={type === "all" ? "active" : ""} onClick={() => setType("all")}>All</button>
            <button className={type === "lost" ? "active" : ""} onClick={() => setType("lost")}>Lost</button>
            <button className={type === "found" ? "active" : ""} onClick={() => setType("found")}>Found</button>
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((value) => <option key={value}>{value}</option>)}
          </select>

          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map((value) => <option key={value}>{value}</option>)}
          </select>
        </div>
      </div>

      {filtered.length ? (
        <div className="item-grid browse-grid">
          {filtered.map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
      ) : (
        <EmptyState title="Nothing matched your search" text="Try a different keyword or remove one of the filters." />
      )}
    </section>
  );
}