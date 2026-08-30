import "./JobCard.css";
import { StatusBadge } from "../../ui/StatusBadge";
import type { Job } from "../../../types";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onRemove: (id: string) => void;
  readOnly?: boolean;
}

export function JobCard({ job, onEdit, onRemove, readOnly }: JobCardProps) {
  return (
    <div className="job-card">
      <div>
        <div className="job-card-header">
          <div className="job-card-title">
            <span className="job-company">{job.company}</span>
            <span className="job-role">{job.role}</span>
          </div>
          <StatusBadge status={job.status} />
        </div>

        {job.nextAction && job.status !== "Rejected" && (
          <div className="job-meta">
            <span className="job-meta-label">Next → </span>
            <span className="job-meta-value">{job.nextAction}</span>
          </div>
        )}

        {job.prepUrl && (
          <div className="job-meta">
            <span className="job-meta-label">Prep Work: </span>
            <a
              href={job.prepUrl}
              target="_blank"
              rel="noreferrer"
              className="job-link job-prep-link"
            >
              Open Doc ↗
            </a>
          </div>
        )}

        {job.dateApplied && (
          <div className="job-meta">
            <span className="job-date"> Applied: {job.dateApplied}</span>
          </div>
        )}

        <div className="job-card-notes">
          {job.notes && (
            <div className="job-notes"> Notes: {job.notes}</div>
          )}
        </div>

      </div>

      <div className="job-card-actions">
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            className="job-link"
          >
            ↗
          </a>
        )}
        <button
          onClick={() => onEdit(job)}
          className="job-btn"
          disabled={readOnly}
          title={readOnly ? "Sign in to edit" : undefined}
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm(`Delete ${job.company}?`)) onRemove(job.id);
          }}
          className="job-btn job-btn-danger"
          disabled={readOnly}
          title={readOnly ? "Sign in to delete" : undefined}
        >
          ×
        </button>
      </div>
    </div>
  );
}