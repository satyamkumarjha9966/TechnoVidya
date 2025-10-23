import React, { useEffect, useState } from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../apis/auth";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [toast, setToast] = useState("");

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

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  }

  const isEmailLike = (val) => /\S+@\S+\.\S+/.test(val);

  function validate() {
    const er = {};
    if (!form.firstName.trim()) er.firstName = "First name is required.";
    if (!form.lastName.trim()) er.lastName = "Last name is required.";
    if (!form.email.trim()) er.email = "Email is required.";
    else if (!isEmailLike(form.email.trim()))
      er.email = "Enter a valid email address.";
    if (!form.password) er.password = "Password is required.";
    else if (form.password.length < 6) er.password = "Minimum 6 characters.";
    if (!form.agree) er.agree = "Please accept the terms to continue.";
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
      // TODO: Replace with your API call
      const res = await signUp(form);
      if (res.success) {
        showToast("Account created! Redirecting…");
        setLoading(false);
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } else {
          setLoading(false);
          showToast(res.error.message);
      }
    } catch (err) {
      setLoading(false);
      showToast("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="signup-page">
      {/* Left / Hero */}
      <section className="su-hero" aria-label="Brand hero">
        <div className="su-brand">
          <div className="su-logo" aria-label="LMS Logo">
            <span className="su-dot"></span>
            <span>LMS</span>
          </div>

          <h1 className="su-tagline">
            Empower your skills in{" "}
            <span className="su-emph">Cloud, Code & Circuits</span>.
          </h1>

          <div className="su-carousel" aria-live="polite" aria-atomic="true">
            <span>{courses[rotIdx]}</span>
          </div>
        </div>

        <div className="su-illustration" aria-hidden="true">
          <svg viewBox="0 0 600 400">
            <defs>
              <linearGradient id="su-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path
              d="M0,320 C120,260 180,340 300,300 C420,260 460,200 600,240 L600,400 L0,400 Z"
              fill="url(#su-grad)"
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

      {/* Right / Sign Up Card */}
      <section className="su-auth" aria-label="Sign up">
        <div className="su-card" role="region" aria-labelledby="su-card-title">
          <h2 id="su-card-title">Create your free account</h2>
          <p className="su-subtitle">
            Start learning MERN, Java, Python, DevOps & EC today.
          </p>

          <form className="su-form" onSubmit={onSubmit} noValidate>
            <div className="su-grid">
              {/* First Name */}
              <div className="su-field">
                <label htmlFor="firstName">First Name</label>
                <div
                  className={
                    "su-inputwrap" + (errors.firstName ? " su-err" : "")
                  }
                >
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={onChange}
                    required
                  />
                </div>
                <p
                  className={
                    "su-help" + (errors.firstName ? " su-help-err" : "")
                  }
                >
                  {errors.firstName || ""}
                </p>
              </div>

              {/* Last Name */}
              <div className="su-field">
                <label htmlFor="lastName">Last Name</label>
                <div
                  className={
                    "su-inputwrap" + (errors.lastName ? " su-err" : "")
                  }
                >
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={onChange}
                    required
                  />
                </div>
                <p
                  className={
                    "su-help" + (errors.lastName ? " su-help-err" : "")
                  }
                >
                  {errors.lastName || ""}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="su-field">
              <label htmlFor="email">Email</label>
              <div className={"su-inputwrap" + (errors.email ? " su-err" : "")}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
              <p className={"su-help" + (errors.email ? " su-help-err" : "")}>
                {errors.email || ""}
              </p>
            </div>

            {/* Password */}
            <div className="su-field">
              <label htmlFor="password">Password</label>
              <div
                className={
                  "su-inputwrap su-pwd" + (errors.password ? " su-err" : "")
                }
              >
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={onChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="su-toggle"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  aria-pressed={showPwd}
                  onClick={() => setShowPwd((s) => !s)}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              <p
                className={"su-help" + (errors.password ? " su-help-err" : "")}
              >
                {errors.password || ""}
              </p>
            </div>

            {/* Terms */}
            <div className="su-row">
              <label className="su-check">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={onChange}
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="su-link">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="su-link">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.agree ? (
                <span className="su-help su-help-err">{errors.agree}</span>
              ) : null}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={"su-btn su-primary" + (loading ? " su-loading" : "")}
              disabled={loading}
            >
              <span className="su-btnlabel">Create Account</span>
              <span className="su-spin" aria-hidden="true"></span>
            </button>

            {/* Divider + Google */}
            {/* <div className="su-divider">
              <span>OR</span>
            </div>

            <button type="button" className="su-btn su-google">
              <img
                alt=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
              <span>Sign up with Google</span>
            </button> */}

            <p className="su-foot">
              Already have an account?{" "}
              <Link to="/signin" className="su-link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* Toast */}
      <div
        className={"su-toast" + (toast ? " su-toast-show" : "")}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast}
      </div>
    </main>
  );
}
