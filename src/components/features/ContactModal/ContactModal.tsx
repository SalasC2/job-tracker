import { useState } from "react";
import { CONTACT_TYPES, CONTACT_TYPE_CONFIG } from "../../../constants/contacts";
import type { Contact, ContactType } from "../../../types";
import "../JobModal/JobModal.css";

type ContactFormData = Omit<Contact, "id" | "userId" | "createdAt" | "updatedAt">;

interface ContactModalProps {
  contact?: Contact | null;
  onSave: (form: ContactFormData) => void;
  onClose: () => void;
}

const EMPTY_FORM: ContactFormData = {
  name: "",
  company: "",
  type: "Recruiter",
  email: "",
  linkedin: "",
  lastContact: "",
  nextFollowup: "",
  notes: "",
};

const FIELDS: {
  label: string;
  key: keyof ContactFormData;
  placeholder: string;
  type?: string;
}[] = [
    { label: "Name", key: "name", placeholder: "e.g. Brian" },
    { label: "Company", key: "company", placeholder: "e.g. TekSystems" },
    { label: "Email", key: "email", placeholder: "email@example.com" },
    { label: "LinkedIn", key: "linkedin", placeholder: "LinkedIn profile URL" },
    { label: "Last Contact", key: "lastContact", placeholder: "", type: "date" },
    { label: "Next Follow-up", key: "nextFollowup", placeholder: "", type: "date" },
  ];

export function ContactModal({ contact, onSave, onClose }: ContactModalProps) {
  const [form, setForm] = useState<ContactFormData>(
    contact
      ? {
        name: contact.name,
        company: contact.company,
        type: contact.type,
        email: contact.email,
        linkedin: contact.linkedin,
        lastContact: contact.lastContact,
        nextFollowup: contact.nextFollowup,
        notes: contact.notes,
      }
      : EMPTY_FORM
  );

  const setField = (key: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={(e) => e.stopPropagation()}>
        <div className="job-modal-header">
          <h2 className="job-modal-title">
            {contact ? "Edit Contact" : "Add Contact"}
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
          <label className="job-modal-label">Type</label>
          <select
            className="job-modal-input"
            value={form.type}
            onChange={(e) => setField("type", e.target.value as ContactType)}
          >
            {CONTACT_TYPES.map((t) => (
              <option key={t} value={t}>
                {CONTACT_TYPE_CONFIG[t].label}
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
            placeholder="Context, how you met, what they're looking for..."
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