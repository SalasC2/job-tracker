import { useState } from "react";

import { useJobs } from "./hooks/useJobs";
import { useAuthUser } from "./hooks/useAuthUser";

import { signInWithGoogle } from "./utils/supabase";

import { StatPill } from "./components/ui/StatPill";

import { FilterTabs } from "./components/features/FilterTabs";
import { JobCard } from "./components/features/JobCard";
import { JobModal } from "./components/features/JobModal";

import { Landing } from "./components/layout/Landing";
import { Navbar } from "./components/layout/Navbar";

import type { Job } from "./types";

import { INITIAL_JOBS } from "./data/initialJobs";

import "./App.css";

export default function App() {
  const { jobs, addJob, updateJob, removeJob, stats } = useJobs();
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

  const STATUS_PRIORITY: Record<string, number> = {
    "Final": 0,
    "Technical": 1,
    "Phone Screen": 2,
    "Applied": 3,
    "Bookmarked": 4,
    "Offer": 5,
    "Rejected": 6,
  };

  const filteredJobs = activeJobs
    .filter((j) => {
      const matchFilter = filter === "All" || j.status === filter;
      const matchSearch =
        !search ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.role.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      const priorityDiff = (STATUS_PRIORITY[a.status] ?? 99) - (STATUS_PRIORITY[b.status] ?? 99);
      if (priorityDiff !== 0) return priorityDiff;
      // Secondary sort: most recent date first
      return (b.dateApplied ?? "").localeCompare(a.dateApplied ?? "");
    });

  const activeStats = {
    total: activeJobs.length,
    applied: activeJobs.filter((j) => !["Bookmarked", "Rejected"].includes(j.status)).length,
    active: activeJobs.filter((j) => ["Phone Screen", "Technical", "Final"].includes(j.status)).length,
    offers: activeJobs.filter((j) => j.status === "Offer").length,
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
          <div className="stats-row">
            <StatPill label="Total" value={activeStats.total} />
            <StatPill label="Applied" value={activeStats.applied} color="#3B82F6" />
            <StatPill label="Active" value={stats.active} color="#F59E0B" />
            <StatPill label="Offers" value={activeStats.offers} color="#22C55E" />
          </div>

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

        </div>
      )}
    </div>
  );
}