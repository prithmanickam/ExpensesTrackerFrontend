// @ts-ignore
import clientPromise from "@/lib/actions/mongoDb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const req = await request.json();
  // console.log(req);

  try {
    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("expense-tracker");

    const posts = await db
      .collection("post")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

      console.log(posts)

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.log((error as Error).message);
    return new NextResponse('bro what', {
      status: 404
    })
  }
}

export async function POST(request: Request) {
  const res = await request.json();

  return NextResponse.json({ data: "This is made up" });
}

export async function DELETE(request: Request) {
  const res = await request.json();

  return NextResponse.json({ data: "This is made up" });
}
