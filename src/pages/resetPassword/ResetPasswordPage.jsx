import React, { useEffect, useMemo, useState } from "react";
import "./ResetPasswordPage.css";
import { Link } from "react-router-dom";

// Helper: get URL param (works with any router)
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirm: "",
    token: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  // Token from URL (?token=...)
  const token = useMemo(() => getQueryParam("token") || "", []);
  useEffect(() => {
    if (!token)
      setErrors((e) => ({ ...e, token: "Invalid or missing reset link." }));
  }, [token]);

  // Rotating headline
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
    const id = setInterval(
      () => setRotIdx((i) => (i + 1) % courses.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  // Password strength (0–4)
  const score = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[a-z]/.test(password)) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    // cap to 4 for meter (still reward symbols in copy)
    return Math.min(s, 4);
  }, [password]);

  function validate() {
    const er = { password: "", confirm: "", token: "" };
    if (!token) er.token = "Invalid or missing reset link.";
    if (!password) er.password = "New password is required.";
    else if (password.length < 8) er.password = "Minimum 8 characters.";
    if (!confirm) er.confirm = "Please confirm your password.";
    else if (confirm !== password) er.confirm = "Passwords do not match.";
    setErrors(er);
    return !er.token && !er.password && !er.confirm;
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: Replace with your real API call:
      // await fetch('/api/auth/reset-password', {
      //   method:'POST',
      //   headers:{'Content-Type':'application/json'},
      //   body: JSON.stringify({ token, password })
      // });
      await new Promise((r) => setTimeout(r, 1200)); // demo
      setLoading(false);
      showToast("Password updated! You can now sign in.");
      // window.location.href = "/signin";
    } catch (err) {
      setLoading(false);
      setErrors((er) => ({
        ...er,
        token: "This reset link is invalid or expired.",
      }));
    }
  }

  return (
    <main className="reset-page">
      {/* Left / Hero */}
      {/* <section className="rp-hero" aria-label="Brand hero">
        <div className="rp-brand">
          <div className="rp-logo" aria-label="LMS Logo">
            <span className="rp-dot"></span>
            <span>LMS</span>
          </div>

          <h1 className="rp-tagline">
            Secure your access to{" "}
            <span className="rp-emph">Cloud, Code & Circuits</span>.
          </h1>

          <div className="rp-underline" aria-hidden="true"></div>

          <div className="rp-carousel" aria-live="polite" aria-atomic="true">
            <span>{courses[rotIdx]}</span>
          </div>

          <ul className="rp-chips" aria-label="Popular tracks">
            <li>MERN</li>
            <li>Java</li>
            <li>Python</li>
            <li>DevOps</li>
            <li>EC</li>
          </ul>
        </div>

        <div className="rp-illustration" aria-hidden="true">
          <svg viewBox="0 0 600 400">
            <defs>
              <linearGradient id="rp-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path
              d="M0,320 C120,260 180,340 300,300 C420,260 460,200 600,240 L600,400 L0,400 Z"
              fill="url(#rp-grad)"
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

      {/* Right / Reset Card */}
      <section className="rp-auth" aria-label="Reset password">
        <div className="rp-card" role="region" aria-labelledby="rp-card-title">
          <h2 id="rp-card-title">Reset your password</h2>
          <p className="rp-subtitle">
            Create a strong password and confirm it to continue.
          </p>

          {/* Token error banner (if any) */}
          {errors.token ? (
            <div className="rp-banner" role="alert">
              {errors.token}
            </div>
          ) : null}

          <form className="rp-form" onSubmit={onSubmit} noValidate>
            {/* New Password */}
            <div className="rp-field">
              <label htmlFor="password">New Password</label>
              <div
                className={
                  "rp-inputwrap rp-pwd" + (errors.password ? " rp-err" : "")
                }
              >
                <input
                  id="password"
                  name="password"
                  type={showPwd1 ? "text" : "password"}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((er) => ({ ...er, password: "" }));
                  }}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="rp-toggle"
                  aria-label={showPwd1 ? "Hide password" : "Show password"}
                  aria-pressed={showPwd1}
                  onClick={() => setShowPwd1((s) => !s)}
                >
                  {showPwd1 ? "Hide" : "Show"}
                </button>
              </div>
              <p
                className={"rp-help" + (errors.password ? " rp-help-err" : "")}
              >
                {errors.password ||
                  "Use 8+ chars with upper/lowercase, a number, and a symbol."}
              </p>

              {/* Strength Meter */}
              <div className="rp-meter" aria-hidden="true" data-score={score}>
                <span className={"bar" + (score >= 1 ? " on" : "")}></span>
                <span className={"bar" + (score >= 2 ? " on" : "")}></span>
                <span className={"bar" + (score >= 3 ? " on" : "")}></span>
                <span className={"bar" + (score >= 4 ? " on" : "")}></span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="rp-field">
              <label htmlFor="confirm">Confirm Password</label>
              <div
                className={
                  "rp-inputwrap rp-pwd" + (errors.confirm ? " rp-err" : "")
                }
              >
                <input
                  id="confirm"
                  name="confirm"
                  type={showPwd2 ? "text" : "password"}
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    setErrors((er) => ({ ...er, confirm: "" }));
                  }}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="rp-toggle"
                  aria-label={showPwd2 ? "Hide password" : "Show password"}
                  aria-pressed={showPwd2}
                  onClick={() => setShowPwd2((s) => !s)}
                >
                  {showPwd2 ? "Hide" : "Show"}
                </button>
              </div>
              <p className={"rp-help" + (errors.confirm ? " rp-help-err" : "")}>
                {errors.confirm || ""}
              </p>
            </div>

            <button
              type="submit"
              className={"rp-btn rp-primary" + (loading ? " rp-loading" : "")}
              disabled={loading}
            >
              <span className="rp-btnlabel">Update Password</span>
              <span className="rp-spin" aria-hidden="true"></span>
            </button>

            <p className="rp-foot">
              Remembered your password?{" "}
              <Link to="/signin" className="rp-link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* Toast */}
      <div
        className={"rp-toast" + (toast ? " rp-toast-show" : "")}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast}
      </div>
    </main>
  );
}
