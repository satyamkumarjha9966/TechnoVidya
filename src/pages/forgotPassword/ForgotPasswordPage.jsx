import React, { useEffect, useState } from "react";
import "./ForgotPasswordPage.css";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  // Rotating headline items (same as SignIn/SignUp for consistency)
  const courses = [
    "Learn MERN",
    "Master DevOps (AWS + Azure)",
    "Explore AI",
    "Crack Java & DSA",
    "Build with Python",
    "EC: Embedded • Networking • VLSI",
  ];
  const [rotIdx, setRotIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRotIdx((i) => (i + 1) % courses.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const isEmailLike = (val) => /\S+@\S+\.\S+/.test(val);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const v = email.trim();
    if (!v) return setError("Please enter your email address.");
    if (!isEmailLike(v)) return setError("Enter a valid email address.");

    setLoading(true);
    try {
      // TODO: Replace with real API call to request a reset link
      // await fetch('/api/auth/forgot-password', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: v }) });
      await new Promise((r) => setTimeout(r, 1200));

      setLoading(false);
      showToast("Reset link sent! Check your inbox.");
      // Optionally navigate to a "check your email" screen
      // window.location.href = "/signin";
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="forgot-page">
      {/* Left / Hero */}
      {/* <section className="fp-hero" aria-label="Brand hero">
        <div className="fp-brand">
          <div className="fp-logo" aria-label="LMS Logo">
            <span className="fp-dot"></span>
            <span>LMS</span>
          </div>

          <h1 className="fp-tagline">
            Reset your access to{" "}
            <span className="fp-emph">Cloud, Code & Circuits</span>.
          </h1>

          <div className="fp-underline" aria-hidden="true"></div>

          <div className="fp-carousel" aria-live="polite" aria-atomic="true">
            <span>{courses[rotIdx]}</span>
          </div>

          <ul className="fp-chips" aria-label="Popular tracks">
            <li>MERN</li>
            <li>Java</li>
            <li>Python</li>
            <li>DevOps</li>
            <li>EC</li>
          </ul>
        </div>

        <div className="fp-illustration" aria-hidden="true">
          <svg viewBox="0 0 600 400">
            <defs>
              <linearGradient id="fp-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path
              d="M0,320 C120,260 180,340 300,300 C420,260 460,200 600,240 L600,400 L0,400 Z"
              fill="url(#fp-grad)"
              opacity="0.25"
            />
            <g stroke="#FF7A00" strokeWidth="1.2" opacity="0.7">
              <path d="M40 60h120m20 0h60m40 0h120" />
              <rect x="80" y="90" width="110" height="60" rx="8" fill="none" />
              <rect x="220" y="90" width="120" height="60" rx="8" fill="none" />
              <rect x="370" y="90" width="150" height="60" rx="8" fill="none" />
              <path d="M135 150v40h90v-20" fill="none" />
              <circle cx="450" cy="200" r="40" fill="none" />
              <path d="M410 200h-70m90 40v40m-180-20h120" />
            </g>
          </svg>
        </div>
      </section> */}

      {/* Right / Forgot Card */}
      <section className="fp-auth" aria-label="Forgot password">
        <div className="fp-card" role="region" aria-labelledby="fp-card-title">
          <h2 id="fp-card-title">Forgot your password?</h2>
          <p className="fp-subtitle">
            Enter your email and we’ll send you a secure link to reset it.
          </p>

          <form className="fp-form" onSubmit={onSubmit} noValidate>
            {/* Email only (exactly one field) */}
            <div className="fp-field">
              <label htmlFor="email">Email</label>
              <div className={"fp-inputwrap" + (error ? " fp-err" : "")}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
              <p className={"fp-help" + (error ? " fp-help-err" : "")}>
                {error || ""}
              </p>
            </div>

            <button
              type="submit"
              className={"fp-btn fp-primary" + (loading ? " fp-loading" : "")}
              disabled={loading}
            >
              <span className="fp-btnlabel">Send Reset Link</span>
              <span className="fp-spin" aria-hidden="true"></span>
            </button>

            <p className="fp-foot">
              Remembered your password?{" "}
              <Link to="/signin" className="fp-link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* Toast */}
      <div
        className={"fp-toast" + (toast ? " fp-toast-show" : "")}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast}
      </div>
    </main>
  );
}
