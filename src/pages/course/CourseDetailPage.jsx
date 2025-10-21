import React, { useMemo, useState } from "react";
import "./CourseDetailPage.css";

/** ---- Demo data (replace with API) ---- */
const course = {
  id: "cloud-101",
  title: "Introduction to Cloud Computing",
  progress: 38,
  status: "In Progress",
  badge: "Self-Paced",
  modules: [
    {
      id: "m1",
      title: "Module 1 — Cloud Basics",
      done: 6,
      total: 12,
      status: "In Progress",
    },
    {
      id: "m2",
      title: "Module 2 — EC2 & Storage",
      done: 2,
      total: 10,
      status: "Assigned",
    },
    {
      id: "m3",
      title: "Module 3 — Load Balancing",
      done: 10,
      total: 10,
      status: "Completed",
    },
    {
      id: "m4",
      title: "Module 4 — VPC & Networking",
      done: 0,
      total: 9,
      status: "Not Started",
    },
  ],
};

const SectionBtn = ({ active, label, onClick }) => (
  <button
    className={`cdp-secbtn${active ? " active" : ""}`}
    aria-current={active ? "page" : undefined}
    onClick={onClick}
  >
    {label}
  </button>
);

export default function CourseDetailPage() {
  const [activeSection, setActiveSection] = useState("Overview"); // Overview | Self-Paced | Study Materials
  const [midOpen, setMidOpen] = useState(true);

  const stats = useMemo(() => {
    const total = course.modules.reduce((a, m) => a + m.total, 0);
    const done = course.modules.reduce((a, m) => a + m.done, 0);
    return { total, done };
  }, []);

  return (
    <main className={`cdp-shell${midOpen ? "" : " mid-collapsed"}`}>
      {/* ---------- LEFT: Overview panel ---------- */}
      <aside className="cdp-left" aria-label="Overview panel">
        <h3 className="cdp-left-title">Overview</h3>

        <div className="cdp-overview-cards">
          <div className="cdp-card mini">
            <div className="cdp-kpi">{course.progress}%</div>
            <div className="cdp-kpi-label">Completed</div>
            <div className="cdp-kpi-bar">
              <span style={{ width: `${course.progress}%` }} />
            </div>
          </div>

          <div className="cdp-card mini">
            <div className="cdp-kpi">
              {stats.done}/{stats.total}
            </div>
            <div className="cdp-kpi-label">Units</div>
          </div>
        </div>

        <div className="cdp-left-stack">
          <SectionBtn
            label="Overview"
            active={activeSection === "Overview"}
            onClick={() => setActiveSection("Overview")}
          />
          <SectionBtn
            label="Self-Paced"
            active={activeSection === "Self-Paced"}
            onClick={() => setActiveSection("Self-Paced")}
          />
          <SectionBtn
            label="Study Materials"
            active={activeSection === "Study Materials"}
            onClick={() => setActiveSection("Study Materials")}
          />
        </div>

        <div className="cdp-left-foot">
          <span className="cdp-pill">{course.badge}</span>
          <span className="cdp-badge">{course.status}</span>
        </div>
      </aside>

      {/* ---------- MIDDLE: Modules (collapsible) ---------- */}
      <section className="cdp-mid" aria-label="Modules" aria-expanded={midOpen}>
        <header className="cdp-mid-head">
          <h3>Modules</h3>
          <button
            className="cdp-toggle"
            onClick={() => setMidOpen((v) => !v)}
            aria-label={midOpen ? "Hide modules panel" : "Show modules panel"}
            aria-pressed={!midOpen}
            title={midOpen ? "Hide" : "Show"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M7 10l5 5l5-5z" />
            </svg>
          </button>
        </header>

        <div className="cdp-mid-scroll">
          {course.modules.map((m) => {
            const pct = Math.round((m.done / m.total) * 100);
            return (
              <article key={m.id} className="cdp-module">
                <div className="cdp-module-top">
                  <h4 className="cdp-module-title">{m.title}</h4>
                  <span
                    className={`cdp-status ${m.status
                      .replace(" ", "")
                      .toLowerCase()}`}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="cdp-progress">
                  <div
                    className="cdp-progress-bar"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="cdp-module-meta">
                  <span>
                    {m.done}/{m.total} Units
                  </span>
                  <span>{pct}%</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------- RIGHT: Content view ---------- */}
      <section className="cdp-right" aria-label="Content view">
        <header className="cdp-right-head">
          <div className="cdp-right-titles">
            <h2>{course.title}</h2>
            <div className="cdp-right-sub">
              <span className="cdp-badge">{course.status}</span>
              <span className="cdp-pill">{course.badge}</span>
            </div>
          </div>
          <div className="cdp-right-progress">
            <div className="cdp-kpi-bar big">
              <span style={{ width: `${course.progress}%` }} />
            </div>
            <span className="cdp-right-pct">{course.progress}%</span>
          </div>
        </header>

        {/* Card that switches based on left selection */}
        {activeSection === "Overview" && (
          <div className="cdp-card">
            <h3>Course Overview</h3>
            <p className="cdp-desc">
              Learn core cloud concepts with visuals and hands-on examples.
              Track your progress across modules and download study notes
              anytime.
            </p>
            <ul className="cdp-bullets">
              <li>Clear module roadmap with checkpoints</li>
              <li>Inline quizzes and downloadable notes</li>
              <li>Certificate upon completion</li>
            </ul>
          </div>
        )}

        {activeSection === "Self-Paced" && (
          <div className="cdp-card">
            <h3>Self-Paced Player</h3>
            <div className="cdp-video-wrap">
              <video
                className="cdp-video"
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                controls
                controlsList="nodownload"
              />
            </div>
            <div className="cdp-actions">
              <button className="cdp-btn primary">Mark as Complete</button>
              <button className="cdp-btn">Add Note</button>
            </div>
          </div>
        )}

        {activeSection === "Study Materials" && (
          <div className="cdp-card">
            <h3>PDF Viewer</h3>
            <div className="cdp-pdf-wrap">
              <iframe
                className="cdp-pdf"
                title="Study Material"
                src="https://arxiv.org/pdf/1707.08567.pdf#toolbar=1&navpanes=0"
              />
            </div>
            <div className="cdp-actions">
              <a
                className="cdp-btn primary"
                href="https://arxiv.org/pdf/1707.08567.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
