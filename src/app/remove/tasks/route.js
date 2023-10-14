import { NextResponse } from "next/server";
import { initDeleteTask } from "@/app/firebase/firestore/firestore";

export async function GET(request, response) {
  let searchParams = new URL(request.url).searchParams;
  let taskId = searchParams.get("taskId");
  try {
    let res = await initDeleteTask(taskId);
    if (!res) return NextResponse.json(`delete operation finished successfully`,{status:200});
  } catch (error) {
    return NextResponse.json(`something is wrong ${error}`, { status: 500 });
  }
}
