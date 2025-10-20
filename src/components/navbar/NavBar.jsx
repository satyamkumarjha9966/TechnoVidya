import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown on outside click / Esc
  useEffect(() => {
    function onDocClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Demo handlers (replace with your router/navigation)
  const goto = (path) => {
    // window.location.href = path;
    console.log("Navigate to:", path);
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="tv-navbar">
      <div className="tv-container">
        {/* Left: Brand */}
        <div className="tv-left">
          {/* // Small Screen Menu bar Button  */}
          {/* <button
            className={"tv-burger" + (menuOpen ? " is-open" : "")}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button> */}

          <a
            href="#"
            className="tv-brand"
            onClick={(e) => {
              e.preventDefault();
              goto("/");
            }}
          >
            <span className="tv-dot" aria-hidden="true"></span>
            <span className="tv-name">TechnoVidya</span>
          </a>
        </div>

        {/* Center: Nav links (desktop) */}
        {/* // Big Screen Menu Bar Buttons  */}
        {/* <nav className="tv-nav" aria-label="Main">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goto("/courses");
            }}
          >
            Courses
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goto("/result");
            }}
          >
            Result
          </a>
          <a
            href="#"
            className="tv-bell"
            onClick={(e) => {
              e.preventDefault();
              goto("/notifications");
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a6 6 0 0 0-6 6v2.3c0 .7-.26 1.38-.73 1.9L3.7 14.1c-.46.49-.14 1.3.54 1.3H20c.68 0 1-.82.54-1.3l-1.57-1.9c-.47-.52-.73-1.2-.73-1.9V8a6 6 0 0 0-6-6Zm0 20a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3Z"
              />
            </svg>
            <span className="tv-badge" aria-label="3 new notifications">
              3
            </span>
            <span className="tv-link-text">Notification</span>
          </a>
        </nav> */}
        {/* {token && (
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "400",
              })}
            >
              Dashboard
            </NavLink>
          )}
          {token && user?.role === "admin" && (
            <NavLink
              to="/admin/dashboard"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "400",
              })}
            >
              Admin Dashboard
            </NavLink>
          )} */}

        {/* Right: Profile */}
        <div className="tv-right" ref={profileRef}>
          {/* Optional quick search (commented - enable if needed) */}
          {/* <div className="tv-search">
            <input placeholder="Search courses..." aria-label="Search" />
          </div> */}

          <button
            className="tv-profile"
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((o) => !o)}
          >
            {/* Simple user circle icon */}
            <svg
              className="tv-avatar"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5Z"
              />
            </svg>
            {/* <span className="tv-username">Profile</span> */}
            <svg
              className={"tv-caret" + (profileOpen ? " up" : "")}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fill="currentColor" d="M7 10l5 5l5-5z" />
            </svg>
          </button>

          {/* Dropdown */}
          <ul className={"tv-menu" + (profileOpen ? " show" : "")} role="menu">
            <li role="menuitem">
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goto("/profile");
                  }}
                >
                  View Profile
                </a>
              </div>
            </li>
            <li role="menuitem">
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goto("/settings");
                  }}
                >
                  Settings
                </a>
              </div>
            </li>
            <li role="menuitem">
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goto("/courses");
                  }}
                >
                  Courses
                </a>
              </div>
            </li>
            <li role="menuitem" className="tv-danger">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    console.log("Logout");
                    // await fetch('/api/auth/logout', { method:'POST' });
                    goto("/signin");
                  }}
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={"tv-drawer" + (menuOpen ? " open" : "")}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goto("/courses");
            }}
          >
            Courses
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goto("/result");
            }}
          >
            Result
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goto("/notifications");
            }}
          >
            Notification
          </a>
        </nav>
      </div>
    </header>
  );
}
