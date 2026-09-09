import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useItems } from "../context/ItemsContext";
import EmptyState from "../components/EmptyState";

export default function MyReports() {
  const { items, deleteItem } = useItems();

  const [activeTab, setActiveTab] = useState("all");

  const reports = items.slice(0, 6);

  const filteredReports =
    activeTab === "all"
      ? reports
      : reports.filter((item) => item.type === activeTab);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (confirmed) {
      deleteItem(id);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">YOUR ACTIVITY</p>
          <h1>My reports</h1>
          <p>Reports created in this browser are saved locally.</p>
        </div>

        <Link to="/report" className="button primary">
          + New report
        </Link>
      </div>

      <div className="activity-tabs">

        {/* ALL */}
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All reports <span>{reports.length}</span>
        </button>

        {/* LOST */}
        <button
          className={activeTab === "lost" ? "active" : ""}
          onClick={() => setActiveTab("lost")}
        >
          Lost{" "}
          <span>
            {reports.filter((i) => i.type === "lost").length}
          </span>
        </button>

        {/* FOUND */}
        <button
          className={activeTab === "found" ? "active" : ""}
          onClick={() => setActiveTab("found")}
        >
          Found{" "}
          <span>
            {reports.filter((i) => i.type === "found").length}
          </span>
        </button>

      </div>

      {filteredReports.length ? (
        <div className="report-list">
          {filteredReports.map((item) => (
            <div className="report-row" key={item.id}>

              <Link
                className="report-link"
                to={`/item/${item.id}`}
              >
                <div className={`row-icon ${item.type}`}>
                  {item.type === "lost" ? "?" : "✓"}
                </div>

                <div className="row-main">
                  <strong>{item.name}</strong>
                  <span>
                    {item.category} · {item.location}
                  </span>
                </div>

                <span
                  className={`status ${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>

                <span className="row-date">
                  {item.date}
                </span>

                <span className="row-arrow">
                  →
                </span>
              </Link>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete report
              </button>

            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            activeTab === "lost"
              ? "No lost reports"
              : activeTab === "found"
              ? "No found reports"
              : "No reports yet"
          }
          text={
            activeTab === "lost"
              ? "You haven't reported any lost items yet."
              : activeTab === "found"
              ? "You haven't reported any found items yet."
              : "Your reports will appear here after you publish one."
          }
        />
      )}
    </section>
  );
}