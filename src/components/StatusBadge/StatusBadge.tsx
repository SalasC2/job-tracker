import { STATUS_CONFIG } from "../../constants/statuses";

import type { Status } from "../../types";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.color}33`,
      padding: "2px 10px", borderRadius: 4,
      fontSize: 11, fontWeight: 600,
      letterSpacing: "0.05em", textTransform: "uppercase",
      whiteSpace: "nowrap", fontFamily: "'JetBrains Mono', monospace",
    }}>
      {cfg.label}
    </span>
  );
}