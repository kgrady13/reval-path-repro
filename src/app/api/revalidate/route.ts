import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/en/";

  console.log(`[Revalidate] Path: ${path}`);
  console.log(`[Revalidate] Timestamp: ${new Date().toISOString()}`);

  // Strip trailing slash for Vercel deployment compatibility
  // See: https://github.com/vercel/next.js/issues/59836
  const pathWithoutSlash = path.replace(/\/$/, '');
  console.log(`[Revalidate] Path without trailing slash: ${pathWithoutSlash}`);

  revalidatePath(pathWithoutSlash, "page");

  console.log(`[Revalidate] Complete`);

  return NextResponse.json({
    success: true,
    revalidated: pathWithoutSlash,
    timestamp: new Date().toISOString(),
    message: `Revalidated ${pathWithoutSlash}. Go back and hard refresh to see the new timestamp.`,
  });
}
