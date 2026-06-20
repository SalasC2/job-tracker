import { useState } from "react";
import { STATUSES, STATUS_CONFIG } from "../../../constants/statuses";
import type { Job, Status } from "../../../types";
import "./JobModal.css";

type JobFormData = Omit<Job, "id">;

interface JobModalProps {
  job?: Job | null;
  onSave: (form: JobFormData) => void;
  onClose: () => void;
}

const EMPTY_FORM: JobFormData = {
  company: "",
  role: "",
  status: "Bookmarked",
  dateApplied: "",
  nextAction: "",
  notes: "",
  url: "",
  prepUrl: "",
};

const FIELDS: {
  label: string;
  key: keyof JobFormData;
  placeholder: string;
  type?: string;
}[] = [
  { label: "Company", key: "company", placeholder: "e.g. Cursor" },
  { label: "Role", key: "role", placeholder: "e.g. Frontend Engineer" },
  { label: "URL", key: "url", placeholder: "Job posting link" },
  { label: "Prep URL", key: "prepUrl", placeholder: "Job Prep Document"},
  { label: "Date Applied", key: "dateApplied", placeholder: "YYYY-MM-DD", type: "date" },
  { label: "Next Action", key: "nextAction", placeholder: "e.g. Send follow-up" },
];

export function JobModal({ job, onSave, onClose }: JobModalProps) {
  const [form, setForm] = useState<JobFormData>(
    job
      ? {
          company: job.company,
          role: job.role,
          status: job.status,
          dateApplied: job.dateApplied,
          nextAction: job.nextAction,
          notes: job.notes,
          url: job.url,
          prepUrl: job.prepUrl,
        }
      : EMPTY_FORM
  );

  const setField = (key: keyof JobFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div
        className="job-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="job-modal-header">
          <h2 className="job-modal-title">
            {job ? "Edit Job" : "Add Job"}
          </h2>
          <button className="job-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {FIELDS.map(({ label, key, placeholder, type }) => (
          <div key={key} className="job-modal-field">
            <label className="job-modal-label">{label}</label>
            <input
              type={type ?? "text"}
              className="job-modal-input"
              value={form[key] as string}
              onChange={(e) => setField(key, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        ))}

        <div className="job-modal-field">
          <label className="job-modal-label">Status</label>
          <select
            className="job-modal-input"
            value={form.status}
            onChange={(e) =>
              setField("status", e.target.value as Status)
            }
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </option>
            ))}
          </select>
        </div>

        <div className="job-modal-field">
          <label className="job-modal-label">Notes</label>
          <textarea
            className="job-modal-textarea"
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder="Stack, culture, connections, etc."
            rows={6}
          />
        </div>

        <div className="job-modal-actions">
          <button className="job-modal-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="job-modal-btn job-modal-btn-primary"
            onClick={() => onSave(form)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}