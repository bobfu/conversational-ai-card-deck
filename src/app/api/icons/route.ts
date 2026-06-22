import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const iconDir = path.join(process.cwd(), "public", "icons", "cards");

  try {
    const files = await readdir(iconDir, {
      withFileTypes: true
    });

    const icons = files
      .filter((file) => file.isFile() && file.name.endsWith(".svg"))
      .map((file) => file.name.replace(/\.svg$/u, ""))
      .sort();

    return NextResponse.json({ icons });
  } catch {
    return NextResponse.json({ icons: [] });
  }
}
