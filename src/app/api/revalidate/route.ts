import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag") || "lang-en";

  console.log(`[Revalidate] Tag: ${tag}`);
  console.log(`[Revalidate] Timestamp: ${new Date().toISOString()}`);

  // Next.js 16 requires a cacheLife profile as second parameter
  revalidateTag(tag, "max");

  console.log(`[Revalidate] Complete`);

  return NextResponse.json({
    success: true,
    revalidated: tag,
    timestamp: new Date().toISOString(),
    message: `Revalidated tag ${tag}. Go back and hard refresh to see the new timestamp.`,
  });
}
