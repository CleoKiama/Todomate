import {
  writeBatch,
  collection,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  getFirestore,
  connectFirestoreEmulator,
  Timestamp,
} from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { firebaseConfig } from "../config";
import { nanoid } from "nanoid";

// firebaseApps previously initialized using initializeApp()
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);


export async function write(data) {
  const { category } = data;
  return await setDoc(doc(db, "categories", category.categoryId), {
    description: category.description,
    userId: category.userId,
    /*   Timestamp : new Timestamp() */
  });
}
export async function getCategories(userId) {
  const q = query(
    collection(db, "categories"),
    where("userId", "==", `${userId}`)
  );
  const querySnapshot = await getDocs(q);
  let data = querySnapshot.docs.map((doc) => {
    let data = doc.data();
    return {
      categoryId: doc.id,
      ...data,
    };
  });
  return data;
}

export async function initDeleteCategory(data) {
    await deleteDoc(doc(db, "categories", data.categoryId));
    await deleteTasksByCategory(data.categoryId) 
 
}
export async function getCategoryDescription(categoryId) {
  const docRef = doc(db, "categories", categoryId);
  const docSnap = await getDoc(docRef);
     let data = {
      categoryId : categoryId,
      ...docSnap.data()
     }
    return data
}
//tasks queries
async function deleteTasksByCategory(categoryId) {
  const q = query(
    collection(db, "tasks"),
     where('categoryId','==',categoryId)
  ); 
  const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach(async (doc)=>{
        await initDeleteTask(doc.id)
    })
 
  return
}
export async function getAllTasks(userId) {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  let data = querySnapshot.docs.map((doc) => {
    let data = doc.data();
    return {
      todoId: doc.id,
      ...data,
    };
  });
  return data;
}

export async function writeTasks(data) {
  const { task } = data;
  await setDoc(doc(db, "tasks", task.todoId), {
    description: task.description,
    important: task.important,
    categoryId: task.categoryId,
    dueDate: task.dueDate,
    categoryDescription: task.categoryDescription,
    userId: task.userId,
    completed: task.completed,
    /*   Timestamp : new Timestamp() */
  });
}

export async function getTasksByCategoryId(categoryId, userId) {
 
  const q = query(
    collection(db, "tasks"),
     where("categoryId", "==", `${categoryId}`),  
     where("userId", "==",userId) 
  );
  const querySnapshot = await getDocs(q);
  let data = querySnapshot.docs.map((doc) => {
    let data = doc.data();
    return {
      todoId: doc.id,
      ...data,
    };
  });
   return data
}
export async function getTasksByRoute(route, userId) {
 
  const q = query(
    collection(db, "tasks"),
    where(`${route}`, "==", true),
    where("userId", "==", userId)
  ); // add another where condition here
  const querySnapshot = await getDocs(q);
  let data = querySnapshot.docs.map((doc) => {
    let data = doc.data();
    return {
      todoId: doc.id,
      ...data,
    };
  });
  if (data.length < 1) {
    return [];
  }
  return data;
}
export async function initDeleteTask(taskId) {
  return await deleteDoc(doc(db, "tasks", taskId));
}
