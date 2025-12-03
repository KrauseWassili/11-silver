"use client";

export default function Buttons() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        marginTop: "20px",
      }}
    >
      <button>Start training</button>or
      <button>Login</button>
    </div>
  );
}
