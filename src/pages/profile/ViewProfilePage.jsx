import React, { useEffect, useRef, useState } from "react";
import "./ViewProfilePage.css";

const initialProfile = {
  fullName: "Aarav Sharma",
  username: "aarav.sh",
  email: "aarav@example.com",
  phone: "+91 98765 43210",
  location: "Bengaluru, IN",
  headline: "Cloud & DevOps Learner • MERN Enthusiast",
  bio: "Passionate about AWS, Kubernetes and building clean web apps. Currently taking DevOps + MERN tracks at TechnoVidya.",
  skills: ["AWS", "Docker", "React", "Node.js"],
  website: "https://aarav.dev",
  github: "https://github.com/aarav",
  linkedin: "https://linkedin.com/in/aarav",
  avatarUrl: "",
  stats: { courses: 7, certificates: 2, hours: 86 },
};

export default function ViewProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState("");
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  useEffect(() => {
    if (!editing) setForm(profile);
  }, [editing, profile]);

  const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const isHandle = (v) => /^[a-zA-Z0-9._-]{3,}$/.test(v);

  function validate() {
    const er = {};
    if (!form.fullName.trim()) er.fullName = "Full name is required.";
    if (!form.username.trim() || !isHandle(form.username))
      er.username = "3+ chars: letters, digits, . _ -";
    if (!form.email.trim() || !isEmail(form.email))
      er.email = "Enter a valid email.";
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  }

  function addSkillFromInput(e) {
    e.preventDefault();
    const input = e.target.elements.skill.value.trim();
    if (!input) return;
    if (form.skills.includes(input)) return e.target.reset(), null;
    setForm((f) => ({ ...f, skills: [...f.skills, input] }));
    e.target.reset();
  }

  function removeSkill(s) {
    setForm((f) => ({ ...f, skills: f.skills.filter((x) => x !== s) }));
  }

  function onPickAvatar() {
    fileRef.current?.click();
  }

  function onAvatarFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, avatarUrl: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  async function onSave(e) {
    e.preventDefault();
    if (!validate()) return;
    // Simulate API save
    await new Promise((r) => setTimeout(r, 800));
    setProfile(form);
    setEditing(false);
    setToast("Profile updated successfully!");
    setTimeout(() => setToast(""), 1800);
  }

  function onCancel() {
    setEditing(false);
    setForm(profile);
    setErrors({});
  }

  return (
    <main className="vp-wrap">
      {/* Cover + Avatar */}
      <section className="vp-hero">
        <div className="vp-cover" aria-hidden="true" />
        <div className="vp-hero-row">
          <div className="vp-avatar-wrap">
            <img
              className="vp-avatar"
              alt={`${profile.fullName} avatar`}
              src={
                (editing ? form.avatarUrl : profile.avatarUrl) ||
                "https://api.dicebear.com/8.x/initials/svg?seed=" +
                  encodeURIComponent(profile.fullName || "User")
              }
            />
            {editing && (
              <>
                <button
                  className="vp-change"
                  onClick={onPickAvatar}
                  type="button"
                >
                  Change
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={onAvatarFile}
                  hidden
                />
              </>
            )}
          </div>

          <div className="vp-identity">
            <h1 className="vp-name">{profile.fullName}</h1>
            <div className="vp-handle">@{profile.username}</div>
            <div className="vp-headline">{profile.headline}</div>
          </div>

          <div className="vp-cta">
            {!editing ? (
              <button
                className="vp-btn primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="vp-edit-actions">
                <button className="vp-btn" onClick={onCancel} type="button">
                  Cancel
                </button>
                <button className="vp-btn primary" form="vp-form">
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="vp-stats">
          <div className="vp-stat">
            <strong>{profile.stats.courses}</strong>
            <span>Courses</span>
          </div>
          <div className="vp-stat">
            <strong>{profile.stats.certificates}</strong>
            <span>Certificates</span>
          </div>
          <div className="vp-stat">
            <strong>{profile.stats.hours}h</strong>
            <span>Learning</span>
          </div>
        </div>
      </section>

      {/* About / Details */}
      <section className="vp-main">
        {!editing ? (
          <div className="vp-grid">
            <article className="vp-card">
              <h3>About</h3>
              <p className="vp-bio">{profile.bio}</p>

              <ul className="vp-list">
                <li>
                  <span>📧</span>
                  {profile.email}
                </li>
                <li>
                  <span>📱</span>
                  {profile.phone}
                </li>
                <li>
                  <span>📍</span>
                  {profile.location}
                </li>
                <li>
                  <span>🔗</span>
                  <a href={profile.website} target="_blank" rel="noreferrer">
                    {profile.website}
                  </a>
                </li>
                <li>
                  <span>🐙</span>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <span>🔗</span>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>

              <div className="vp-chiprow">
                {profile.skills.map((s) => (
                  <span key={s} className="vp-chip">
                    {s}
                  </span>
                ))}
              </div>
            </article>

            <article className="vp-card">
              <h3>Recent Activity</h3>
              <ul className="vp-activity">
                <li>🏆 Achieved “AWS Foundations” certificate</li>
                <li>▶️ Watched “EC2 Basics” (12m)</li>
                <li>📝 Scored 9/10 on “Load Balancing Quiz”</li>
              </ul>
            </article>
          </div>
        ) : (
          <form id="vp-form" className="vp-form" onSubmit={onSave} noValidate>
            <div className="vp-form-grid">
              <div className="vp-field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  placeholder="Your full name"
                  required
                  className={errors.fullName ? "err" : ""}
                />
                <small className={errors.fullName ? "msg-err" : "msg"}>
                  {errors.fullName || ""}
                </small>
              </div>

              <div className="vp-field">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={onChange}
                  placeholder="username"
                  className={errors.username ? "err" : ""}
                  required
                />
                <small className={errors.username ? "msg-err" : "msg"}>
                  {errors.username || ""}
                </small>
              </div>

              <div className="vp-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="name@domain.com"
                  className={errors.email ? "err" : ""}
                  required
                />
                <small className={errors.email ? "msg-err" : "msg"}>
                  {errors.email || ""}
                </small>
              </div>

              <div className="vp-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+91 ..."
                />
              </div>

              <div className="vp-field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  placeholder="City, Country"
                />
              </div>

              <div className="vp-field wide">
                <label htmlFor="headline">Headline</label>
                <input
                  id="headline"
                  name="headline"
                  value={form.headline}
                  onChange={onChange}
                  placeholder="Short professional headline"
                />
              </div>

              <div className="vp-field wide">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={onChange}
                  rows="4"
                  placeholder="Tell others about yourself..."
                />
              </div>

              <div className="vp-field">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  placeholder="https://..."
                />
              </div>
              <div className="vp-field">
                <label htmlFor="github">GitHub</label>
                <input
                  id="github"
                  name="github"
                  value={form.github}
                  onChange={onChange}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="vp-field">
                <label htmlFor="linkedin">LinkedIn</label>
                <input
                  id="linkedin"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={onChange}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              {/* Skills editor */}
              <div className="vp-field wide">
                <label>Skills</label>
                <div className="vp-chiprow editable">
                  {form.skills.map((s) => (
                    <span key={s} className="vp-chip">
                      {s}
                      <button
                        type="button"
                        aria-label={`Remove ${s}`}
                        onClick={() => removeSkill(s)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <form onSubmit={addSkillFromInput} className="vp-skill-add">
                  <input
                    name="skill"
                    placeholder="Add a skill and press Enter"
                  />
                </form>
              </div>
            </div>

            <div className="vp-edit-actions mobile">
              <button className="vp-btn" type="button" onClick={onCancel}>
                Cancel
              </button>
              <button className="vp-btn primary" type="submit">
                Save
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Toast */}
      <div
        className={"vp-toast" + (toast ? " show" : "")}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </main>
  );
}
