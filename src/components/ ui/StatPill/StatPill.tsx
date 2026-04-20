import "./StatPill.css";

interface StatPillProps {
  label: string;
  value: number;
  color?: string;
}

export function StatPill({ label, value, color }: StatPillProps) {
  return (
    <div className="stat-pill">
      <div
        className="stat-pill-value"
        style={{ color: color || "#F1F5F9" }}
      >
        {value}
      </div>
      <div className="stat-pill-label">{label}</div>
    </div>
  );
}