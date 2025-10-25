import React, { useMemo, useState } from "react";
import "./CourseDetailPage.css";
import { Link } from "react-router-dom";

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
      title: "Introduction To Cloud and AWS ",
      lessons: [
        {
          id: "m1l1",
          title: "  Introduction to Cloud Computing and AWS",
          kind: "video",
          duration: "12:45",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: "m1l2",
          title: "  Deployment and Service Models",
          kind: "video",
          duration: "09:12",
          src: "https://www.w3schools.com/html/movie.mp4",
        },
        {
          id: "m1l3",
          title: "Virtualization & Hypervisors",
          kind: "pdf",
          duration: "09:00",
          src: "https://arxiv.org/pdf/1707.08567.pdf",
        },
        {
          id: "m1l4",
          title: "AWS Suite (With Analogy)",
          kind: "video",
          duration: "07:04",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: "m1l5",
          title: "AWS Well-Architected Framework",
          kind: "video",
          duration: "11:00",
          src: "https://www.w3schools.com/html/movie.mp4",
        },
      ],
    },
    {
      id: "m2",
      title: "EC2 and File Systems",
      lessons: [
        {
          id: "m2l1",
          title: "EC2 Basics",
          kind: "video",
          duration: "08:34",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: "m2l2",
          title: "EBS & EFS",
          kind: "pdf",
          duration: "12:11",
          src: "https://arxiv.org/pdf/2107.08950.pdf",
        },
      ],
    },
    {
      id: "m3",
      title: "Load Balancing",
      lessons: [
        {
          id: "m3l1",
          title: "ELB Overview",
          kind: "video",
          duration: "06:28",
          src: "https://www.w3schools.com/html/movie.mp4",
        },
      ],
    },
    {
      id: "m4",
      title: "Introduction To Cloud and AWS ",
      lessons: [
        {
          id: "m4l1",
          title: "  Introduction to Cloud Computing and AWS",
          kind: "video",
          duration: "12:45",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: "m4l2",
          title: "  Deployment and Service Models",
          kind: "video",
          duration: "09:12",
          src: "https://www.w3schools.com/html/movie.mp4",
        },
        {
          id: "m4l3",
          title: "Virtualization & Hypervisors",
          kind: "pdf",
          duration: "09:00",
          src: "https://arxiv.org/pdf/1707.08567.pdf",
        },
        {
          id: "m4l4",
          title: "AWS Suite (With Analogy)",
          kind: "video",
          duration: "07:04",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: "m4l5",
          title: "AWS Well-Architected Framework",
          kind: "video",
          duration: "11:00",
          src: "https://www.w3schools.com/html/movie.mp4",
        },
      ],
    },
    {
      id: "m5",
      title: "EC2 and File Systems",
      lessons: [
        {
          id: "m5l1",
          title: "EC2 Basics",
          kind: "video",
          duration: "08:34",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: "m5l2",
          title: "EBS & EFS",
          kind: "pdf",
          duration: "12:11",
          src: "https://arxiv.org/pdf/2107.08950.pdf",
        },
      ],
    },
    {
      id: "m6",
      title: "Load Balancing",
      lessons: [
        {
          id: "m6l1",
          title: "ELB Overview",
          kind: "video",
          duration: "06:28",
          src: "https://www.w3schools.com/html/movie.mp4",
        },
      ],
    },
  ],
};

const SectionBtn = ({ icon, active, label, onClick }) => (
  <div
    className={`cdp-secbtn${active ? " active" : ""}`}
    aria-current={active ? "page" : undefined}
    onClick={onClick}
  >
    <span style={{ fontSize: "20px", marginBottom: "8px" }}>{icon}</span>
    <span>{label}</span>
  </div>
);

export default function CourseDetailPage() {
  const [activeSection, setActiveSection] = useState("LIVECLASSES"); // LIVECLASSES | Self-Paced | Study Materials
  const [midOpen, setMidOpen] = useState(true);
  const [opendModule, setOpenedModule] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const toggleModule = (moduleId) => {
    if (opendModule.includes(moduleId)) {
      setOpenedModule(opendModule.filter((id) => id !== moduleId));
    } else {
      setOpenedModule([...opendModule, moduleId]);
    }
  };

  const stats = useMemo(() => {
    const total = course.modules.reduce((a, m) => a + m.total, 0);
    const done = course.modules.reduce((a, m) => a + m.done, 0);
    return { total, done };
  }, []);

  return (
    <div>
      <header className="cdp-right-head">
        <div style={{ display: `flex`, gap: `20px`, alignItems: `center` }}>
          <Link
            to={`/`}
            style={{
              fontSize: `40px`,
              fontWeight: 800,
              textDecoration: `none`,
              color: `white`,
            }}
          >
            ←
          </Link>
          <div className="cdp-right-titles">
            <h2 style={{ color: `white`, fontWeight: 600 }}>{course.title}</h2>
            <div className="cdp-right-progress">
              <div className="cdp-kpi-bar big">
                <span style={{ width: `${course.progress}%` }} />
              </div>
              <span
                className="cdp-right-pct"
                style={{ color: `white`, fontWeight: 600 }}
              >
                {course.progress}%
              </span>
            </div>
          </div>
          {/* <div className="cdp-right-sub">
            <span className="cdp-badge">{course.status}</span>
            <span className="cdp-pill">{course.badge}</span>
          </div> */}
        </div>
        <div
          style={{
            display: `flex`,
            gap: `12px`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <button className="cdp-btn primary">Support</button>
          <div></div>
          <button className="cdp-btn primary">Notes</button>
        </div>
      </header>

      <main className={`cdp-shell${midOpen ? "" : " mid-collapsed"}`}>
        {/* ---------- LEFT: LIVECLASSES panel ---------- */}
        <aside className="cdp-left" aria-label="LIVECLASSES panel">
          {/* <h3 className="cdp-left-title">LIVECLASSES</h3> */}

          {/* <div className="cdp-overview-cards">
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
          </div> */}

          <div className="cdp-left-stack">
            {/* {midOpen ? (
              <div></div>
            ) : (
              <div className="cdp-left-stack-button">
                <button
                  className="cdp-toggle"
                  onClick={() => setMidOpen((v) => !v)}
                  aria-label={
                    midOpen ? "Hide modules panel" : "Show modules panel"
                  }
                  aria-pressed={!midOpen}
                  title={midOpen ? "Hide" : "Show"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path fill="currentColor" d="M10 17l5-5l-5-5z" />
                  </svg>
                </button>
              </div>
            )} */}
            <SectionBtn
              icon="🛜"
              label="LIVE CLASSES"
              active={activeSection === "LIVECLASSES"}
              onClick={() => setActiveSection("LIVECLASSES")}
            />
            <SectionBtn
              icon="📼"
              label="SELF PACED"
              active={activeSection === "Self-Paced"}
              onClick={() => setActiveSection("Self-Paced")}
            />
            <SectionBtn
              icon="📄"
              label="STUDY MATERIALS"
              active={activeSection === "Study Materials"}
              onClick={() => setActiveSection("Study Materials")}
            />
          </div>

          {/* <div className="cdp-left-foot">
            <span className="cdp-pill">{course.badge}</span>
            <span className="cdp-badge">{course.status}</span>
          </div> */}
        </aside>

        {/* ---------- MIDDLE: Modules (collapsible) ---------- */}
        <section
          className="cdp-mid"
          aria-label="Modules"
          aria-expanded={midOpen}
        >
          <header className="cdp-mid-head">
            <h3>Modules</h3>
            <button
              className="cdp-toggle"
              onClick={() => setMidOpen((v) => !v)}
              aria-label={midOpen ? "Hide modules panel" : "Show modules panel"}
              aria-pressed={!midOpen}
              title={midOpen ? "Hide" : "Show"}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fill="currentColor" d="M14 7l-5 5l5 5z" />
              </svg>
            </button>
          </header>

          <div className="cdp-mid-scroll">
            {course.modules.map((m) => {
              return (
                <article key={m.id} className="cdp-module">
                  <div
                    className="cdp-module-top"
                    onClick={() => toggleModule(m.id)}
                  >
                    <h4 className="cdp-module-title" title={m.title}>
                      {m.title}
                    </h4>
                    <span className={`cdp-status`}>
                      {opendModule.includes(m.id) ? "⬆️" : "⬇️"}
                    </span>
                  </div>
                  {/* <div className="cdp-progress">
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
                  </div> */}
                  {opendModule.includes(m.id) && (
                    <>
                      <hr />
                      <div className="cdp-lession-cont">
                        {m.lessons.map((l) => (
                          <div
                            className={`cdp-lession-top${
                              selectedLesson == l.id
                                ? " selected-cdp-lession-top"
                                : ""
                            }`}
                            onClick={() => setSelectedLesson(l.id)}
                          >
                            <h4
                              className={`cdp-lession-title${
                                selectedLesson == l.id
                                  ? " selected-cdp-lession-title"
                                  : ""
                              }`}
                              title={l.title}
                            >
                              📺 {l.title}
                            </h4>
                            <span className={`cdp-lession-status`}>
                              {l.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* ---------- RIGHT: Content view ---------- */}
        <section className="cdp-right" aria-label="Content view">
          {/* Card that switches based on left selection */}
          {activeSection === "LIVECLASSES" && (
            <div className="cdp-card">
              <h3>Course LIVECLASSES</h3>
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
            <div className="cdp-card" style={{ height: `94%` }}>
              {/* <h3>Self-Paced Player</h3> */}
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
    </div>
  );
}
