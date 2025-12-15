import { client } from "@/sanity/client";
import { NextRequest, NextResponse } from "next/server";

const COMMENTS_QUERY = `*[_type == "comment" && post._ref == $postId] | order(createdAt desc)`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ message: "Missing postId" }, { status: 400 });
  }

  const comments = await client.fetch(COMMENTS_QUERY, { postId });
  //console.log('COOMENT ' ,comments)
  return NextResponse.json(comments);
}
