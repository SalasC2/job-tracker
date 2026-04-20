import "./JobCard.css";
import { StatusBadge } from "../../ ui/StatusBadge";
import type { Job } from "../../../types";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onRemove: (id: string) => void;
}

export function JobCard({ job, onEdit, onRemove }: JobCardProps) {
  return (
    <div className="job-card">
      <div>
        <div className="job-card-header">
          <span className="job-company">{job.company}</span>
          <span className="job-separator">·</span>
          <span className="job-role">{job.role}</span>
          <StatusBadge status={job.status} />
        </div>

        <div className="job-card-meta">
          {job.nextAction && (
            <div className="job-meta">
              <span className="job-meta-label">Next → </span>
              <span className="job-meta-value">{job.nextAction}</span>
            </div>
          )}
          {job.dateApplied && (
            <div className="job-meta">
              <span className="job-meta-label">Applied: </span>
              <span>{job.dateApplied}</span>
            </div>
          )}
          <div className="job-card-notes">
            {job.notes && (
              <div className="job-notes">{job.notes}</div>
            )}
          </div>
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
        <button onClick={() => onEdit(job)} className="job-btn">
          Edit
        </button>
        <button
          onClick={() => onRemove(job.id)}
          className="job-btn job-btn-danger"
        >
          ×
        </button>
      </div>
    </div>
  );
}