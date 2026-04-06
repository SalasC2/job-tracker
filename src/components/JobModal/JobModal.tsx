import { useState } from "react";
import { STATUSES, STATUS_CONFIG } from "../../constants/statuses";

import type { Job, Status } from "../../types";

type JobFormData = Omit<Job, "id">;

interface JobModalProps {
  job?: Job | null;
  onSave: (form: JobFormData) => void;
  onClose: () => void;
}

const EMPTY_FORM: JobFormData = {
  company: "", role: "", status: "Bookmarked",
  dateApplied: "", nextAction: "", notes: "", url: ""
};

const FIELDS: { label: string; key: keyof JobFormData; placeholder: string }[] = [
  { label: "Company",      key: "company",     placeholder: "e.g. Cursor" },
  { label: "Role",         key: "role",        placeholder: "e.g. Frontend Engineer" },
  { label: "URL",          key: "url",         placeholder: "Job posting link" },
  { label: "Date Applied", key: "dateApplied", placeholder: "YYYY-MM-DD" },
  { label: "Next Action",  key: "nextAction",  placeholder: "e.g. Send follow-up" },
];

const inputStyle = {
  width: "100%", background: "#0D0F13", border: "1px solid #2A2D35",
  borderRadius: 6, padding: "9px 12px", color: "#F1F5F9",
  fontSize: 13, outline: "none", boxSizing: "border-box" as const,
  fontFamily: "'JetBrains Mono', monospace",
};

const labelStyle = {
  display: "block", fontSize: 11, color: "#6B7280",
  marginBottom: 5, letterSpacing: "0.08em",
  textTransform: "uppercase" as const, fontFamily: "'JetBrains Mono', monospace",
};

export function JobModal({ job, onSave, onClose }: JobModalProps) {
  const [form, setForm] = useState<JobFormData>(
    job ? { company: job.company, role: job.role, status: job.status, dateApplied: job.dateApplied, nextAction: job.nextAction, notes: job.notes, url: job.url }
        : EMPTY_FORM
  );

  const set = (k: keyof JobFormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(4px)"
    }} onClick={onClose}>
      <div style={{
        background: "#111318", border: "1px solid #2A2D35",
        borderRadius: 12, padding: 28, width: 480, maxWidth: "90vw",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)"
      }} onClick={(e) => e.stopPropagation()}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#F1F5F9", fontFamily: "'JetBrains Mono', monospace" }}>
            {job ? "Edit Job" : "Add Job"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 18 }}>×</button>
        </div>

        {FIELDS.map(({ label, key, placeholder }) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{label}</label>
            <input value={form[key] as string} onChange={(e) => set(key, e.target.value)} placeholder={placeholder} style={inputStyle} />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Status</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value as Status)} style={inputStyle}>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Notes</label>
          <textarea
            value={form.notes} onChange={(e) => set("notes", e.target.value)}
            placeholder="Stack, culture, connections, etc."
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid #2A2D35", color: "#9CA3AF",
            padding: "9px 18px", borderRadius: 6, cursor: "pointer",
            fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
          }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{
            background: "#3B82F6", border: "none", color: "#fff",
            padding: "9px 18px", borderRadius: 6, cursor: "pointer",
            fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
          }}>Save</button>
        </div>
      </div>
    </div>
  );
}