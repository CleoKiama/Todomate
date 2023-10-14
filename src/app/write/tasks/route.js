import { NextResponse } from "next/server";
import {
  getTasksByCategoryId,
  writeTasks,
  getTasksByRoute,
  getCategoryDescription,
  getAllTasks
} from "@/app/firebase/firestore/firestore";

export async function POST(request) {
  let data = await request.json();
 
  try {
      await writeTasks(data);
     return NextResponse.json(`Task written successfully`);
  } catch (error) {
    return NextResponse.json(`${error.message}`, { status: 500 });
  }
}
export async function GET(request, response) {
  const searchParams = new URL(request.url).searchParams;
  const categoryId = searchParams.get("categoryId");
  const userId  = searchParams.get('userId')
  
  try {
    if (categoryId == "all-tasks") {
     
       let tasks = await getAllTasks(userId)
      let response = {
        category: null,
        tasks:tasks,
      };
      return NextResponse.json(response,{status:200});
    }
    if (categoryId === "important" || categoryId === "completed") {
      let tasks = await getTasksByRoute(categoryId,userId);
      let response = {
        category: null,
        tasks: tasks,
      };
      return NextResponse.json(response,{status:200});
    }
    let tasks = await getTasksByCategoryId(categoryId,userId);
    let category = await getCategoryDescription(categoryId);
    let response = {
      category: category,
      tasks: tasks,
    };
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      `something went wrong ${error}`,
      { status: 500 }
    );
  }
}
