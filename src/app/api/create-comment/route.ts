/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from "next/server";

console.log('token ', process.env.NEXT_SANITY_API_WRITE_TOKEN)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2021-03-25',
})

const err : any =""

export async function POST(req: NextRequest , res :NextResponse) {


try{

    const body = await req.json()

const newComment = await client.create({
     _type: 'comment',
      post: {
        _type: 'reference',
        _ref: body.postId, // ID Sanity du post
      },
      author: body.author,
      content: body.content,
      createdAt: new Date().toISOString(),
    });



/*

const doc = {
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: body.postId, // ID Sanity du post
      },
      author: body.author,
      content: body.content,
      createdAt: new Date().toISOString(),
    }

    await client.create(doc)
*/

    const savedComment = await client.fetch(
      `*[_type == "comment" && _id == $id][0]{
        _id,
        author,
        content,
        "createdAt": coalesce(createdAt, now())
      }`,
      { id: newComment._id }
    );

 return NextResponse.json(savedComment, { status: 200 });
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ message: 'Error', error: err.message }, { status: 500 })
  }
}