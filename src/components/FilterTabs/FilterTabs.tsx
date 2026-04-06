import { STATUS_CONFIG, STATUSES } from "../../constants/statuses";

import type { Status } from "../../types";
import type{ Job } from "../../types";

interface FilterTabsProps {
  filter: string;
  setFilter: (f: string) => void;
  jobs: Job[];
}

export function FilterTabs({ filter, setFilter, jobs }: FilterTabsProps) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
      {["All", ...STATUSES].map((s) => {
        const active = filter === s;
        const cfg = STATUS_CONFIG[s as Status];
        const count = s === "All" ? jobs.length : jobs.filter((j) => j.status === s).length;
        return (
          <button key={s} onClick={() => setFilter(s)} style={{
            background: active ? (cfg?.bg || "#1F2937") : "transparent",
            border: `1px solid ${active ? (cfg?.color || "#6B7280") : "#2A2D35"}`,
            color: active ? (cfg?.color || "#F1F5F9") : "#6B7280",
            padding: "5px 12px", borderRadius: 4, cursor: "pointer",
            fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
            textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.15s",
          }}>
            {s === "All" ? `All (${count})` : `${cfg.label} (${count})`}
          </button>
        );
      })}
    </div>
  );
}