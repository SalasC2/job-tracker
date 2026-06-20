import { CONTACT_TYPE_CONFIG } from "../../../constants/contacts";
import type { ContactType } from "../../../types"

interface ContactTypeBadgeProps {
  type: ContactType;
}

export function ContactTypeBadge({ type }: ContactTypeBadgeProps) {
  const cfg = CONTACT_TYPE_CONFIG[type];

  return (
    <span
      className="status-badge"
      style={{
        background: cfg.bg,
        color: cfg.color,
        borderColor: `${cfg.color}33`,
      }}
    >
      {cfg.label}
    </span>
  );
}