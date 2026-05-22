import { STATUS_CONFIG } from "../../../constants/statuses";
import type { Status } from "../../../types";
import "./StatusBadge.css";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];

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