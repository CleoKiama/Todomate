'use Server'
import styles from "./page.module.css";
import NavContainer from "./components/nav/nav.js";
import NavToggler from "./components/navToggler.js";
import HeaderComponent from "./components/header.js";
import Wrapper from "../wrapper.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/options.js";
import { redirect } from "next/navigation";
import { getCategories } from "../firebase/firestore/firestore";


/* export const generateStaticParams =  process.env.NODE_ENV === "production" ? staticParams :  undefined; */
export const dynamic =  process.env.NODE_ENV === "production" ? 'auto' : 'force-dynamic';
export default async function Layout({ children}) {
      let session = await getServerSession(authOptions)   
      /*  let session ={
          user : {  id : 'd4cUgzl5iI3nMeWY7J3a',
           name  :'cleophas kiama Ngumo',
           email : 'cngumo@kabarak.ac.ke',
           image : '/userImage.jpg'
       }
       } */
  if (!session) {
    redirect("/sign-in");
  }

  let categoriesResult
    try{
      let value =  await Promise.all([
        getCategories(session.user.id),
      ]);
      categoriesResult = value[0]
    }catch(error) {
      return error.message
    }  
    
  return (
    <main className={styles.main_layout}>
      <Wrapper>
        <HeaderComponent
          name={session.user.name}
          email={session.user.email}
          profileUrl={session.user.image}
        />
        <NavToggler />
        <div className={styles.children_holder}>
          <NavContainer
            userId={session.user.id}
            categories={categoriesResult}
          />
          {children}
        </div>
      </Wrapper>
    </main>
  );
}
