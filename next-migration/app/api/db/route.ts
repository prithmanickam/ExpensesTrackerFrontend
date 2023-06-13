// @ts-ignore
import clientPromise from "@/lib/actions/mongoDb";
import { DeleteOnePostSchema, PostArraySchema, PostSchema } from "@/lib/validator/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
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

    console.log(posts);

    return NextResponse.json(
      { data: posts },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log((error as Error).message);
    return new NextResponse("Get Error", {
      status: 404,
    });
  }
}

export async function POST(request: Request) {
  const obj = await request.json();
  try {
    const parsedPost = PostSchema.parse(obj);
    
    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("expense-tracker");

    const posts = await db.collection("post").insertOne(parsedPost);

    return new NextResponse("Post created", {
      status: 201,
    });
  } catch (error) {
    console.log((error as Error).message);

    let badRequest = false;
    if ((error as any).issues[0].code === "invalid_type") badRequest = true;

    return new NextResponse("Post Error", {
      status: badRequest ? 400 : 404,
    });
  }
}

export async function DELETE(request: Request) {
  // TODO: Make delete one item work. Right now only delete-all works
  // const obj = JSON.parse(JSON.stringify(request));
  // console.log(obj)
  // const parsedId = DeleteOnePostSchema.parse(obj)
  try {
    // console.log(id)

    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("expense-tracker");

    const posts = await db.collection("post").deleteMany();
    // const posts = await db.collection("post").deleteOne(id);
    
    return new NextResponse("All Posts deleted", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Delete Error", {
      status: 404,
    });
  }
}
