import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Report from "./pages/Report";
import MyReports from "./pages/MyReports";
import ItemDetails from "./pages/ItemDetails";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/report" element={<Report />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <div>Foundly</div>
        <span>Campus lost & found • Built for students</span>
      </footer>
    </div>
  );
}