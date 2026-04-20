import "./FilterTabs.css";
import { STATUS_CONFIG, STATUSES } from "../../../constants/statuses";
import type { Status, Job } from "../../../types";

interface FilterTabsProps {
  filter: string;
  setFilter: (f: string) => void;
  jobs: Job[];
}

export function FilterTabs({ filter, setFilter, jobs }: FilterTabsProps) {
  
  return (
    <div className="filter-tabs">
      {["All", ...STATUSES].map((s) => {
        const active = filter === s;
        const cfg = STATUS_CONFIG[s as Status];
        const count =
          s === "All"
            ? jobs.length
            : jobs.filter((j) => j.status === s).length;

        return (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`filter-tab ${active ? "active" : ""}`}
            style={
              active
                ? {
                    background: cfg?.bg,
                    borderColor: cfg?.color,
                    color: cfg?.color,
                  }
                : {}
            }
          >
            {s === "All"
              ? `All (${count})`
              : `${cfg.label} (${count})`}
          </button>
        );
      })}
    </div>
  );
}