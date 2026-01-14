export const dynamic = "force-static";
export const revalidate = 86400;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const timestamp = Date.now();

  return (
    <div>
      <h1>Home Page - {lang}</h1>
      <p>Timestamp: {timestamp}</p>
    </div>
  );
}
