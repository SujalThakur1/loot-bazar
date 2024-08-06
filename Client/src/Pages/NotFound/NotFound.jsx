import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="error-message">404 Page Not Found</div>
      <Link to="/" className="home-link">
        <button className="home-button">Go Home</button>
      </Link>
    </div>
  );
}
