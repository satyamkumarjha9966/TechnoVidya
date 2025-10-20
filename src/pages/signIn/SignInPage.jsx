import React, { useEffect, useState } from "react";
import "./SignInPage.css";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    remember: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [toast, setToast] = useState("");

  // Rotating headline items (same set as SignUp for perfect parity)
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
    // Restore remembered identifier
    const remembered = localStorage.getItem("lms_identifier");
    if (remembered) {
      setForm((f) => ({ ...f, identifier: remembered }));
    }
    // Carousel
    const id = setInterval(() => {
      setRotIdx((i) => (i + 1) % courses.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  }

  const isEmailLike = (val) => /\S+@\S+\.\S+/.test(val);
  const isUsername = (val) => /^[a-zA-Z0-9._-]{3,}$/.test(val);

  function validate() {
    const er = {};
    const id = form.identifier.trim();
    if (!id) er.identifier = "Please enter your email or username.";
    else if (id.includes("@") && !isEmailLike(id))
      er.identifier = "Please enter a valid email address.";
    else if (!id.includes("@") && !isUsername(id))
      er.identifier =
        "Username must be 3+ characters (letters, numbers, ., _, -).";

    if (!form.password) er.password = "Password is required.";
    else if (form.password.length < 6) er.password = "Minimum 6 characters.";
    setErrors(er);
    return Object.keys(er).length === 0;
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
      if (form.remember) {
        localStorage.setItem("lms_identifier", form.identifier.trim());
      } else {
        localStorage.removeItem("lms_identifier");
      }

      // TODO: Replace with real API call
      await new Promise((r) => setTimeout(r, 1200));
      showToast("Signed in successfully! Redirecting…");
      setLoading(false);
      // window.location.href = "/dashboard";
    } catch (err) {
      setLoading(false);
      setErrors((er) => ({
        ...er,
        password: "Invalid credentials. Try again.",
      }));
    }
  }

  return (
    <main className="signin-page">
      {/* Left / Hero — updated to mirror SignUp look & feel */}
      <section className="si-hero" aria-label="Brand hero">
        {/* background tech grid via CSS ::before */}

        <div className="si-brand">
          <div className="si-logo" aria-label="LMS Logo">
            <span className="si-dot"></span>
            <span>LMS</span>
          </div>

          <h1 className="si-tagline">
            Empower your skills in{" "}
            <span className="si-emph">Cloud, Code & Circuits</span>.
          </h1>

          {/* animated orange underline bar under the tagline */}
          <div className="si-underline" aria-hidden="true"></div>

          {/* rotating course carousel */}
          <div className="si-carousel" aria-live="polite" aria-atomic="true">
            <span>{courses[rotIdx]}</span>
          </div>

          {/* feature chips to match SignUp’s energy */}
          <ul className="si-chips" aria-label="Popular tracks">
            <li>MERN</li>
            <li>Java</li>
            <li>Python</li>
            <li>DevOps</li>
            <li>EC</li>
          </ul>
        </div>

        {/* Decorative SVG (same as SignUp) */}
        <div className="si-illustration" aria-hidden="true">
          <svg viewBox="0 0 600 400">
            <defs>
              <linearGradient id="si-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path
              d="M0,320 C120,260 180,340 300,300 C420,260 460,200 600,240 L600,400 L0,400 Z"
              fill="url(#si-grad)"
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
      </section>

      {/* Right / Sign In Card (unchanged) */}
      <section className="si-auth" aria-label="Sign in">
        <div className="si-card" role="region" aria-labelledby="si-card-title">
          <h2 id="si-card-title">Welcome Back to Your Learning Journey</h2>
          <p className="si-subtitle">
            Master technologies like MERN, Java, DevOps, and more.
          </p>

          <form className="si-form" onSubmit={onSubmit} noValidate>
            {/* Email / Username */}
            <div className="si-field">
              <label htmlFor="identifier">Email or Username</label>
              <div
                className={
                  "si-inputwrap" + (errors.identifier ? " si-err" : "")
                }
              >
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  inputMode="email"
                  placeholder="Enter your email or username"
                  autoComplete="username"
                  value={form.identifier}
                  onChange={onChange}
                  required
                />
              </div>
              <p
                className={
                  "si-help" + (errors.identifier ? " si-help-err" : "")
                }
              >
                {errors.identifier || ""}
              </p>
            </div>

            {/* Password */}
            <div className="si-field">
              <label htmlFor="password">Password</label>
              <div
                className={
                  "si-inputwrap si-pwd" + (errors.password ? " si-err" : "")
                }
              >
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={onChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="si-toggle"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  aria-pressed={showPwd}
                  onClick={() => setShowPwd((s) => !s)}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              <p
                className={"si-help" + (errors.password ? " si-help-err" : "")}
              >
                {errors.password || ""}
              </p>
            </div>

            {/* Extras */}
            <div className="si-row">
              <label className="si-check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={onChange}
                />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="si-link si-small">
                Forgot your password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={"si-btn si-primary" + (loading ? " si-loading" : "")}
              disabled={loading}
            >
              <span className="si-btnlabel">Sign In</span>
              <span className="si-spin" aria-hidden="true"></span>
            </button>

            {/* Divider + Google */}
            {/* <div className="si-divider">
              <span>OR</span>
            </div>

            <button type="button" className="si-btn si-google">
              <img
                alt=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
              <span>Sign in with Google</span>
            </button> */}

            <p className="si-foot">
              Don’t have an account?{" "}
              <Link to="/signup" className="si-link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* Toast */}
      <div
        className={"si-toast" + (toast ? " si-toast-show" : "")}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast}
      </div>
    </main>
  );
}
