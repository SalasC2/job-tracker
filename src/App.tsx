import { useState } from "react";
import type { Job } from "./types";
import { useJobs } from "./hooks/useJobs";
import { Header } from "./components/Header";
import { StatPill } from "./components/StatPill";
import { FilterTabs } from "./components/FilterTabs";
import { JobCard } from "./components/JobCard";
import { JobModal } from "./components/JobModal";

export default function App() {
  const { jobs, addJob, updateJob, removeJob, stats } = useJobs();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | Job>(null);

  const handleSave = (form: Omit<Job, "id">) => {
    if (modal && modal !== "add") {
      updateJob((modal as Job).id, form);
    } else {
      addJob(form);
    }
    setModal(null);
  };

  const filtered = jobs.filter((j) => {
    const matchFilter = filter === "All" || j.status === filter;
    const matchSearch = !search ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.role.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{
      minHeight: "100vh", background: "#0D0F13", color: "#F1F5F9",
      fontFamily: "'JetBrains Mono', monospace", padding: "32px 24px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      <Header />

      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <StatPill label="Total"   value={stats.total}   color="#F1F5F9" />
        <StatPill label="Applied" value={stats.applied} color="#3B82F6" />
        <StatPill label="Active"  value={stats.active}  color="#F59E0B" />
        <StatPill label="Offers"  value={stats.offers}  color="#22C55E" />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company or role..."
          style={{
            background: "#111318", border: "1px solid #2A2D35", borderRadius: 6,
            padding: "8px 12px", color: "#F1F5F9", fontSize: 12, outline: "none",
            width: 220, fontFamily: "'JetBrains Mono', monospace",
          }}
        />
        <button onClick={() => setModal("add")} style={{
          background: "#3B82F6", border: "none", color: "#fff",
          padding: "8px 16px", borderRadius: 6, cursor: "pointer",
          fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
          marginLeft: "auto",
        }}>+ Add Job</button>
      </div>

      <FilterTabs filter={filter} setFilter={setFilter} jobs={jobs} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#4B5563", padding: 40, fontSize: 13 }}>
            No jobs found. Add one above.
          </div>
        )}
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} onEdit={setModal} onRemove={removeJob} />
        ))}
      </div>

      {modal && (
        <JobModal
          job={modal === "add" ? null : modal as Job}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}