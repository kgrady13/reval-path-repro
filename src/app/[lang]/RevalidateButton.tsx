"use client";

import { useState } from "react";

export function RevalidateButton({ lang }: { lang: string }) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRevalidate() {
    setLoading(true);
    setResult(null);
    try {
      const tag = `lang-${lang}`;
      const res = await fetch(`/api/revalidate/?tag=${tag}`);
      const data = await res.json();
      setResult(`Revalidated at ${data.timestamp}`);
    } catch (e) {
      setResult(`Error: ${e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
      <button
        onClick={handleRevalidate}
        disabled={loading}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: loading ? "wait" : "pointer",
        }}
      >
        {loading ? "Revalidating..." : `Revalidate /${lang}/`}
      </button>
      {result && (
        <span style={{ color: "#0070f3" }}>{result}</span>
      )}
    </div>
  );
}
