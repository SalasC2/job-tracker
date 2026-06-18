import { useState } from "react";

import { useJobs } from "./hooks/useJobs";
import { useAuthUser } from "./hooks/useAuthUser";
import { useContacts } from "./hooks/useContacts";

import { signInWithGoogle } from "./utils/supabase";

import { filterJobs } from "./utils/jobs";

import { StatPill } from "./components/ui/StatPill";

import { FilterTabs } from "./components/features/FilterTabs";
import { JobCard } from "./components/features/JobCard";
import { JobModal } from "./components/features/JobModal";

import { Landing } from "./components/layout/Landing";
import { Navbar } from "./components/layout/Navbar";

import type { Job, Contact } from "./types";

import { INITIAL_JOBS } from "./data/initialJobs";

import "./App.css";

export default function App() {
  const { jobs, addJob, updateJob, removeJob } = useJobs();
  const { contacts, addContact, updateContact, removeContact } = useContacts();
  const [view, setView] = useState<"jobs" | "contacts">("jobs");
  const [contactModal, setContactModal] = useState<null | "add" | Contact>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | Job>(null);

  const user = useAuthUser();

  const activeJobs = isDemoMode ? INITIAL_JOBS : jobs;

  const handleSave = (form: Omit<Job, "id">) => {
    if (modal && modal !== "add") {
      updateJob((modal as Job).id, form);
    } else {
      addJob(form);
    }
    setModal(null);
  };

  const filteredJobs = filterJobs(activeJobs, filter, search)

  const jobStats = {
    total: activeJobs.length,
    applied: activeJobs.filter((j) => !["Bookmarked", "Rejected"].includes(j.status)).length,
    active: activeJobs.filter((j) => ["Phone Screen", "Technical", "Final"].includes(j.status)).length,
    offers: activeJobs.filter((j) => j.status === "Offer").length,
  };

  const contactStats = {
    total: contacts.length,
    recruiters: contacts.filter(c => c.type === "Recruiter").length,
    followUpToday: contacts.filter(c => c.nextFollowup === new Date().toISOString().split("T")[0]).length,
    hiringManagers: contacts.filter(c => c.type === "Hiring Manager").length,
  };

  return (
    <div className="app-container">
      <Navbar user={user} />
      {!user && !isDemoMode ? (
        <Landing onDemo={() => setIsDemoMode(true)} />
      ) : (
        <div className="app-content">
          {isDemoMode && (
            <div className="demo-banner">
              Viewing demo —{" "}
              <button className="demo-banner-btn" onClick={signInWithGoogle}>
                Sign in with Google
              </button>{" "}
              to track your own applications
            </div>
          )}
          <div className="view-toggle">
            <button
              className={`view-btn ${view === "jobs" ? "active" : ""}`}
              onClick={() => setView("jobs")}
            >
              Jobs
            </button>
            <button
              className={`view-btn ${view === "contacts" ? "active" : ""}`}
              onClick={() => setView("contacts")}
            >
              Contacts
            </button>
          </div>
          <div className="stats-row">
            {view === "jobs" && (
              <>
                <StatPill label="Total" value={jobStats.total} />
                <StatPill label="Applied" value={jobStats.applied} color="#3B82F6" />
                <StatPill label="Active" value={jobStats.active} color="#F59E0B" />
                <StatPill label="Offers" value={jobStats.offers} color="#22C55E" />
              </>
            )}

            {view === "contacts" && (
              <>
                <StatPill label="Total" value={contactStats.total} />
                <StatPill label="Recruiters" value={contactStats.recruiters} color="#3B82F6" />
                <StatPill label="Follow Up Today" value={contactStats.followUpToday} color="#F59E0B" />
                <StatPill label="Hiring Managers" value={contactStats.hiringManagers} color="#22C55E" />
              </>
            )}
          </div>

          {view === "contacts" && (
            <div className="job-list">
              {contacts.length === 0 ? (
                <div className="empty-state">No contacts yet. Add one above.</div>
              ) : (
                contacts.map(c => <div key={c.id}>{c.name}</div>)
              )}
            </div>
          )}

          {view === "jobs" && (
            <>
              <div className="search-row">
                <input
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search company or role..."
                />
                <button
                  className="add-job-btn"
                  onClick={() => setModal("add")}
                >
                  + Add Job
                </button>
              </div>

              <FilterTabs filter={filter} setFilter={setFilter} jobs={activeJobs} />

              <div className="job-list">
                {filteredJobs.length === 0 ? (
                  <div className="empty-state">
                    No jobs found. Add one above.
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onEdit={setModal}
                      onRemove={removeJob}
                    />
                  ))
                )}
              </div>

              {modal && (
                <JobModal
                  job={modal === "add" ? null : (modal as Job)}
                  onSave={handleSave}
                  onClose={() => setModal(null)}
                />
              )}
            </>
          )}

        </div>
      )}
    </div>
  );
}