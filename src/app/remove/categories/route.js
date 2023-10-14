import { NextResponse } from "next/server";
import { initDeleteCategory } from "@/app/firebase/firestore/firestore";

export async function GET(request, response) {
 
  let searchParams = new URL(request.url).searchParams;
  let categoryId = searchParams.get("categoryId");
  try {
     await initDeleteCategory({ categoryId: categoryId });
     return NextResponse.json(`categoryId deleted successfully ${categoryId}`,{status:200});
  } catch (error) {
    return NextResponse.json(`something went wrong on our side ${error}`, { status: 500 });
  }
}
