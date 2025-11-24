import React from "react";

export default function Welcome({ onStart }) {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark text-light">
      <div className="text-center">
        <h1 className="display-3 fw-bold">Welcome</h1>

        <p className="mt-3">
          This is a Bootstrap-styled page. Visit{" "}
          <a href="#" className="link-primary">
            this link
          </a>
          .
        </p>

        <button className="btn btn-outline-primary mt-3" onClick={onStart}>
          Enter App
        </button>
      </div>
    </div>
  );
}
