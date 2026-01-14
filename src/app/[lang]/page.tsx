import { unstable_cache } from "next/cache";
import { RevalidateButton } from "./RevalidateButton";

export const dynamic = "force-static";
export const revalidate = 86400;

// Function to get cached page data with tag-based revalidation
function getPageData(lang: string) {
  return unstable_cache(
    async () => {
      return {
        generatedAt: new Date().toISOString(),
        lang,
      };
    },
    [`page-data-${lang}`],
    {
      tags: [`lang-${lang}`],
    }
  )();
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { generatedAt } = await getPageData(lang);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: "600px" }}>
      <h1>Revalidation Test - {lang}</h1>

      <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
        <p style={{ margin: 0 }}>
          <strong>Page generated at:</strong>
        </p>
        <code style={{ fontSize: "1.2rem", color: "#0070f3" }}>{generatedAt}</code>
      </div>

      <h2>Test Steps:</h2>
      <ol style={{ lineHeight: "1.8" }}>
        <li>Note the timestamp above</li>
        <li>
          <RevalidateButton lang={lang} />
        </li>
        <li>Hard refresh this page (Cmd+Shift+R or Ctrl+Shift+R)</li>
        <li>The timestamp should be updated</li>
      </ol>

      <h2>Expected vs Actual:</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li><strong>Expected:</strong> Timestamp updates after revalidation + refresh</li>
        <li><strong>Bug:</strong> Vercel logs show revalidation succeeded, but timestamp stays the same</li>
      </ul>

      <hr style={{ margin: "2rem 0" }} />
      <p>
        <a href="/en/">English</a> | <a href="/es/">Spanish</a>
      </p>
    </div>
  );
}
