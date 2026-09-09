import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemsContext";

const initialForm = {
  type: "lost",
  name: "",
  category: "Electronics",
  color: "",
  location: "Central Library",
  date: "",
  description: "",
  features: "",
  image: ""
};

export default function Report() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const { addItem } = useItems();
  const navigate = useNavigate();

  function change(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1500000) {
      setError("Please choose an image smaller than 1.5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => change("image", reader.result);
    reader.readAsDataURL(file);
  }

  function submit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.date || !form.description.trim()) {
      setError("Please fill in the item name, date and description.");
      return;
    }

    const item = addItem(form);
    navigate(`/item/${item.id}`);
  }

  return (
    <section className="page narrow-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">NEW REPORT</p>
          <h1>Tell us what happened.</h1>
          <p>The more detail you add, the easier it is for someone to recognise the item.</p>
        </div>
      </div>

      <form className="report-form" onSubmit={submit}>
        <div className="form-section">
          <div className="form-section-title">
            <span>01</span>
            <div>
              <h2>Report type</h2>
              <p>Are you looking for something or have you found it?</p>
            </div>
          </div>

          <div className="report-type">
            <button type="button" className={form.type === "lost" ? "selected" : ""} onClick={() => change("type", "lost")}>
              <span className="big-symbol">?</span>
              <strong>I lost something</strong>
              <small>Help me find an item</small>
            </button>
            <button type="button" className={form.type === "found" ? "selected" : ""} onClick={() => change("type", "found")}>
              <span className="big-symbol">✓</span>
              <strong>I found something</strong>
              <small>Help me return an item</small>
            </button>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-title">
            <span>02</span>
            <div>
              <h2>Item details</h2>
              <p>Keep descriptions specific but don't include private information.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="full">
              Item name
              <input value={form.name} onChange={(e) => change("name", e.target.value)} placeholder="e.g. Black leather wallet" />
            </label>

            <label>
              Category
              <select value={form.category} onChange={(e) => change("category", e.target.value)}>
                <option>Electronics</option>
                <option>Wallets</option>
                <option>Documents</option>
                <option>Study</option>
                <option>Accessories</option>
                <option>Clothing</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Colour
              <input value={form.color} onChange={(e) => change("color", e.target.value)} placeholder="e.g. Black" />
            </label>

            <label>
              Location
              <select value={form.location} onChange={(e) => change("location", e.target.value)}>
                <option>Central Library</option>
                <option>Main Canteen</option>
                <option>Block B</option>
                <option>Engineering Block</option>
                <option>Sports Complex</option>
                <option>Auditorium</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Date
              <input type="date" value={form.date} onChange={(e) => change("date", e.target.value)} />
            </label>

            <label className="full">
              Description
              <textarea value={form.description} onChange={(e) => change("description", e.target.value)} placeholder="What does it look like? Where did you last see it?"></textarea>
            </label>

            <label className="full">
              Distinguishing features
              <input value={form.features} onChange={(e) => change("features", e.target.value)} placeholder="A sticker, scratch, keychain, initials, etc." />
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-title">
            <span>03</span>
            <div>
              <h2>Add a photo <small>(optional)</small></h2>
              <p>A clear photo can make an item much easier to recognise.</p>
            </div>
          </div>

          <label className="upload-box">
            <span className="upload-icon">↑</span>
            <strong>Choose an image</strong>
            <small>PNG or JPG · up to 1.5 MB</small>
            <input type="file" accept="image/png,image/jpeg" onChange={handleImage} />
          </label>

          {form.image && <img className="preview-image" src={form.image} alt="Preview" />}
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button type="button" className="button secondary" onClick={() => navigate(-1)}>Cancel</button>
          <button className="button primary" type="submit">Publish report</button>
        </div>
      </form>
    </section>
  );
}