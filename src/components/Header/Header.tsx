export function Header() {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
        <h1 style={{
          margin: 0, fontSize: 26, fontWeight: 800,
          fontFamily: "'Syne', sans-serif", color: "#F1F5F9", letterSpacing: "-0.02em"
        }}>
          Job Tracker
        </h1>
        <span style={{ fontSize: 11, color: "#3B82F6", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
          v0.1
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 12, color: "#4B5563", fontFamily: "'JetBrains Mono', monospace" }}>
        Series A/B · React/JS · SF or Remote · $150k+
      </p>
    </div>
  );
}