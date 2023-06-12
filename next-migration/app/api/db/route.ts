import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
    const res = await request.json()
 
  return NextResponse.json({ data: 'This is made up' })
}

export async function POST(request: Request) {
    const res = await request.json()
 
  return NextResponse.json({ data: 'This is made up' })
}

export async function DELETE(request: Request) {
    const res = await request.json()
 
  return NextResponse.json({ data: 'This is made up' })
}