interface StatPillProps {
  label: string;
  value: number;
  color?: string;
}

export function StatPill({ label, value, color }: StatPillProps) {
  return (
    <div style={{
      background: "#111318", border: "1px solid #2A2D35",
      borderRadius: 8, padding: "10px 16px", textAlign: "center", minWidth: 72
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: color || "#F1F5F9", fontFamily: "'JetBrains Mono', monospace" }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}