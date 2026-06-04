import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.mangaupdates.com/v1/series/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: "Blue Box",
          type: "title",
        }),
      }
    );

    const text = await response.text();

    return NextResponse.json({
      status: response.status,
      body: text,
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
    });
  }
}