import React from "react";
import { Link } from "react-router-dom";
import { useItems } from "../context/ItemsContext";

export default function Admin() {
  const { items, updateItem, deleteItem, clearDemoData } = useItems();

  const lost = items.filter(i => i.type === "lost").length;
  const found = items.filter(i => i.type === "found").length;
  const returned = items.filter(i => i.status === "Returned").length;
  const handleDelete = (id) => {
  const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmed) {
      deleteItem(id);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">DEMO ADMIN VIEW</p>
          <h1>Campus overview</h1>
          <p>A simple management view for reviewing reports and updating item status.</p>
        </div>
        <button className="button secondary" onClick={clearDemoData}>Reset demo data</button>
      </div>

      <div className="admin-stats">
        <div><span>Total reports</span><strong>{items.length}</strong></div>
        <div><span>Lost reports</span><strong>{lost}</strong></div>
        <div><span>Found reports</span><strong>{found}</strong></div>
        <div><span>Returned</span><strong>{returned}</strong></div>
      </div>

      <div className="admin-table">
        <div className="table-head">
          <span>Item</span><span>Type</span><span>Location</span><span>Status</span><span>Action</span>
        </div>
        {items.map((item) => (
          <div className="table-row" key={item.id}>
            <Link to={`/item/${item.id}`}><strong>{item.name}</strong><small>{item.id}</small></Link>
            <span className={`type-pill ${item.type}`}>{item.type}</span>
            <span>{item.location}</span>
            <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
            <button classname="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
            <div className="admin-actions">
              <button
                onClick={() =>
                  updateItem(item.id, {
                    status:
                      item.status === "Returned"
                        ? item.type === "lost"
                          ? "Active"
                          : "Found"
                        : "Returned"
                  })
                }
              >
                {item.status === "Returned" ? "Reopen" : "Mark returned"}
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>

          
          </div>
        ))}
      </div>
    </section>
  );
}