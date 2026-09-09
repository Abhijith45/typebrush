export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: "1rem",
        color: "var(--sub-color)",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid var(--sub-alt-color, #e0e0e0)",
          borderTopColor: "var(--accent-color, #e2b714)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>Loading test...</span>
    </div>
  );
}
