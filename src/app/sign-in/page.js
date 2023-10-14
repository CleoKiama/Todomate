import styles from './page.module.css'
import SignInForm from './form.js'
import {SessionProvider} from "next-auth/react"
export default function Page(){
        
     return (
       
        <section className={styles.page_parent} >
         <div className={styles.main}>
          <h1 >TODOMATE</h1>
        <p>Empower your day, one task at a time</p>
        <p>welcome back</p>
         <SignInForm />
          </div>
       
        </section>
        
     )
}