import { StatusBadge } from "../StatusBadge";

import type { Job } from "../../types";


interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onRemove: (id: number) => void;
}

export function JobCard({ job, onEdit, onRemove }: JobCardProps) {
  return (
    <div
      style={{
        background: "#111318", border: "1px solid #2A2D35",
        borderRadius: 10, padding: "16px 20px",
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 12, transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3B3F4A")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2A2D35")}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9", fontFamily: "'Syne', sans-serif" }}>
            {job.company}
          </span>
          <span style={{ fontSize: 12, color: "#6B7280" }}>·</span>
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>{job.role}</span>
          <StatusBadge status={job.status} />
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {job.nextAction && (
            <div style={{ fontSize: 11 }}>
              <span style={{ color: "#4B5563" }}>Next → </span>
              <span style={{ color: "#F59E0B" }}>{job.nextAction}</span>
            </div>
          )}
          {job.dateApplied && (
            <div style={{ fontSize: 11 }}>
              <span style={{ color: "#4B5563" }}>Applied: </span>
              <span style={{ color: "#9CA3AF" }}>{job.dateApplied}</span>
            </div>
          )}
          {job.notes && (
            <div style={{ fontSize: 11, color: "#6B7280", maxWidth: 400 }}>{job.notes}</div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        {job.url && (
          <a href={job.url} target="_blank" rel="noreferrer" style={{
            background: "none", border: "1px solid #2A2D35", color: "#6B7280",
            padding: "5px 10px", borderRadius: 5, cursor: "pointer",
            fontSize: 11, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace",
          }}>↗</a>
        )}
        <button onClick={() => onEdit(job)} style={{
          background: "none", border: "1px solid #2A2D35", color: "#9CA3AF",
          padding: "5px 10px", borderRadius: 5, cursor: "pointer",
          fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
        }}>Edit</button>
        <button onClick={() => onRemove(job.id)} style={{
          background: "none", border: "1px solid #2A2D35", color: "#EF4444",
          padding: "5px 10px", borderRadius: 5, cursor: "pointer",
          fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
        }}>×</button>
      </div>
    </div>
  );
}