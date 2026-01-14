import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/en/";

  console.log(`[Revalidate] Path: ${path}`);
  console.log(`[Revalidate] Timestamp: ${new Date().toISOString()}`);

  revalidatePath(path);

  console.log(`[Revalidate] Complete`);

  return NextResponse.json({
    success: true,
    revalidated: path,
    timestamp: new Date().toISOString(),
    message: `Revalidated ${path}. Go back and hard refresh to see the new timestamp.`,
  });
}
