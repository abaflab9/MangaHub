import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query } = await req.json();

  const response = await fetch(
    "https://api.mangaupdates.com/v1/series/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: query,
        type: "title",
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}