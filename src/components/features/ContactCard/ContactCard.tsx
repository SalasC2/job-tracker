import "../JobCard/JobCard.css";
import { ContactTypeBadge } from "../../ui/ContactTypeBadge";
import type { Contact } from "../../../types";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onRemove: (id: string) => void;
}

export function ContactCard({ contact, onEdit, onRemove }: ContactCardProps) {
  return (
    <div className="job-card">
      <div>
        <div className="job-card-header">
          <div className="job-card-title">
            <span className="job-company">{contact.name}</span>
            <span className="job-role">{contact.company}</span>
          </div>
          <ContactTypeBadge type={contact.type} />
        </div>

        {contact.nextFollowup && (
          <div className="job-meta">
            <span className="job-meta-label">Follow up → </span>
            <span className="job-meta-value">{contact.nextFollowup}</span>
          </div>
        )}

        {contact.lastContact && (
          <div className="job-meta">
            <span className="job-date">Last contact: {contact.lastContact}</span>
          </div>
        )}

        <div className="job-card-notes">
          {contact.notes && (
            <div className="job-notes">Notes: {contact.notes}</div>
          )}
        </div>
      </div>

      <div className="job-card-actions">
        {contact.linkedin && (
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="job-link"
          >
            LinkedIn ↗
          </a>
        )}
        <button onClick={() => onEdit(contact)} className="job-btn">
          Edit
        </button>
        <button
          onClick={() => onRemove(contact.id)}
          className="job-btn job-btn-danger"
        >
          ×
        </button>
      </div>
    </div>
  );
}