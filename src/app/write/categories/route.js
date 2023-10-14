//http://localhost:3000/write/categories
//http://localhost:3000/sign-in
import { NextResponse } from "next/server";
import { write } from "@/app/firebase/firestore/firestore.js";
export async function POST(request) {
  const data = await request.json();
  try {
    let res = await write(data);
    if (!res) return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(
      `the bug to fix later "${error}" happened remember to fix it later on`
    );
    return NextResponse.json(`${error.message}`, { status: 500 });
  }
}

export async function GET(request, response) {
  let searchParams = new URL(request.url).searchParams;
  let userId = searchParams.get("userId");
  console.log(userId);
  return NextResponse.json("userId set up successfully");
}
