import Main from "../components/main.js";
import styles from "../page.module.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/options.js";
const products = ["cable", "cup", "table", "sandals"];
/* export function generateStaticParams() {
  return products.map((item) => {
    return {
      task: item,
    };
  });
} */
/* export const generateStaticParams =  process.env.NODE_ENV === "production" ? staticParams :  undefined; */
export const dynamic =  process.env.NODE_ENV === "production" ? 'auto' : 'force-dynamic';

export default async function Page({params}) {
  let session 
  try{
    session  = await getServerSession (authOptions) 
    
 }catch(error) {
  console.log(error.message)
 }

  return ( 
    <div className={styles.main_page}>
      <Main userId={session.user.id} />
    </div>
  );
}
