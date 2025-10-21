import React, { useMemo, useState } from "react";
import "./CoursesDashboard.css";
import { useNavigate } from "react-router-dom";

/** Demo dataset – replace with API data */
const demoCourses = [
  {
    id: "c1",
    title: "AWS Solutions Architect Associate — Self Paced",
    track: "DevOps",
    type: "Self-paced",
    status: "inprogress",
    progress: 35,
    unitsDone: 45,
    unitsTotal: 130,
    badge: "Certificate",
    thumb: "",
    updatedAt: "2025-10-12",
  },
  {
    id: "c2",
    title: "Advanced Certification in Cloud Computing and DevOps",
    track: "Cloud",
    type: "Program",
    status: "assigned",
    progress: 0,
    unitsDone: 0,
    unitsTotal: 120,
    badge: "New",
    thumb: "",
    updatedAt: "2025-10-18",
  },
  {
    id: "c3",
    title: "MERN Stack Bootcamp — Live",
    track: "MERN",
    type: "Live",
    status: "overdue",
    progress: 62,
    unitsDone: 31,
    unitsTotal: 50,
    badge: "Live",
    thumb: "",
    updatedAt: "2025-10-10",
  },
  {
    id: "c4",
    title: "Java + DSA Mastery",
    track: "Java",
    type: "Self-paced",
    status: "completed",
    progress: 100,
    unitsDone: 80,
    unitsTotal: 80,
    badge: "Completed",
    thumb: "",
    updatedAt: "2025-09-20",
  },
  {
    id: "c5",
    title: "Python for Data Engineering",
    track: "Python",
    type: "Self-paced",
    status: "inprogress",
    progress: 12,
    unitsDone: 6,
    unitsTotal: 50,
    badge: "Certificate",
    thumb: "",
    updatedAt: "2025-10-15",
  },
];

const TABS = [
  { key: "all", label: "All Courses" },
  { key: "inprogress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  //   { key: "assigned", label: "Assigned" },
  //   { key: "overdue", label: "Overdue" },
];

export default function CoursesDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("recent"); // recent | progress | title

  // Summary (could come from API)
  const summary = useMemo(() => {
    const totalToDo = demoCourses.filter(
      (c) => c.status !== "completed"
    ).length;
    const assignmentOverdue = demoCourses.filter(
      (c) => c.status === "overdue"
    ).length;
    const quizOverdue = 0;
    const completed = demoCourses.filter(
      (c) => c.status === "completed"
    ).length;
    return { totalToDo, assignmentOverdue, quizOverdue, completed };
  }, []);

  const filtered = useMemo(() => {
    let list = [...demoCourses];

    if (tab !== "all") list = list.filter((c) => c.status === tab);

    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(s) ||
          c.track.toLowerCase().includes(s) ||
          c.type.toLowerCase().includes(s)
      );
    }

    switch (sort) {
      case "progress":
        list.sort((a, b) => b.progress - a.progress);
        break;
      case "title":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return list;
  }, [tab, q, sort]);

  const countsByTab = useMemo(() => {
    const m = {
      all: demoCourses.length,
      inprogress: 0,
      completed: 0,
      assigned: 0,
      overdue: 0,
    };
    demoCourses.forEach((c) => (m[c.status] += 1));
    return m;
  }, []);

  return (
    <main className="tv-courses">
      {/* Top overview cards */}
      <section className="tv-cards" aria-label="Overview">
        <OverviewCard
          color="violet"
          value={summary.totalToDo}
          label="Courses To Do"
          icon="📘"
        />
        <OverviewCard
          color="orange"
          value={summary.assignmentOverdue}
          label="Assignment Overdue"
          icon="⏰"
        />
        <OverviewCard
          color="cyan"
          value={summary.quizOverdue}
          label="Quiz Overdue"
          icon="📝"
        />
        <OverviewCard
          color="green"
          value={summary.completed}
          label="Completed Course"
          icon="🏆"
        />
      </section>

      {/* Filters / Menubar */}
      <section className="tv-filterbar" aria-label="Filters">
        <div className="tv-tabs" role="tablist" aria-label="Course status">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={"tv-tab" + (tab === t.key ? " active" : "")}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              <span className="tv-count">
                {t.key === "all" ? countsByTab.all : countsByTab[t.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="tv-tools">
          <div className="cd-tv-search">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses..."
              aria-label="Search courses"
            />
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="m21 20.3l-5.6-5.6A7 7 0 1 0 4 10a7 7 0 0 0 11.7 5.4l5.6 5.6l.7-.7zM10 16a6 6 0 1 1 0-12a6 6 0 0 1 0 12z"
              />
            </svg>
          </div>

          {/* <label className="tv-sort">
            <span>Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort courses"
            >
              <option value="recent">Recently Updated</option>
              <option value="progress">Progress</option>
              <option value="title">Title A–Z</option>
            </select>
          </label> */}
        </div>
      </section>

      {/* Course list */}
      <section className="tv-list" aria-label="Courses">
        {filtered.length === 0 ? (
          <div className="tv-empty">No courses match your filters.</div>
        ) : (
          filtered.map((c) => <CourseCard key={c.id} course={c} />)
        )}
      </section>
    </main>
  );
}

function OverviewCard({ color, value, label, icon }) {
  return (
    <div className={`ov-card ${color}`} role="status" aria-live="polite">
        <div className="ov-icon-shadow"></div>
      <div className="ov-top">
        <span className="ov-value">{value}</span>
        <span className="ov-icon" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="ov-label">{label}</div>
    </div>
  );
}

function CourseCard({ course }) {
  const navigate = useNavigate();
  const action =
    course.status === "completed"
      ? "View"
      : course.progress > 0
      ? "Continue"
      : "Start";

  return (
    <div className="c-wrapper">
      <article className="c-card" aria-label={course.title}>
        <div className="c-thumb" aria-hidden="true">
          <span className="c-initial">{course.track[0]}</span>
        </div>
        <div className="c-left">
          <div className="c-body">
            <div className="c-line1">
              <span className="c-title">{course.title}</span>
              {/* {course.badge && (
                <span className={"c-badge " + course.badge.toLowerCase()}>
                  {course.badge}
                </span>
              )} */}
              {/* {course.type && <span className="c-tag">{course.type}</span>} */}
            </div>

            <div className="c-line2">
              {/* <span className={"c-status " + course.status}>
                {course.status === "inprogress" && "In Progress"}
                {course.status === "completed" && "Completed"}
                {course.status === "assigned" && "Assigned"}
                {course.status === "overdue" && "Overdue"}
              </span> */}
              <span className="c-meta">
                {course.unitsDone}/{course.unitsTotal} Units
                {/* Updated
                {new Date(course.updatedAt).toLocaleDateString()} */}
              </span>
            </div>
          </div>
        </div>

        <div className="c-right">
          <button
            className="c-btn"
            onClick={() => navigate(`/course/${course.id}`)}
          >
            {action} Course
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="m10 17l5-5l-5-5v10z" />
            </svg>
          </button>
        </div>
      </article>
      <div className="c-progress" aria-label={`Progress ${course.progress}%`}>
        <div className="c-bar" style={{ width: `${course.progress}%` }} />
      </div>
    </div>
  );
}
