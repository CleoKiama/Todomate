import styles from './page.module.css'
import SignUpForm from './form.js'
export default function Page(){

     return (
        <section className={styles.page_parent} >
         <div className={styles.main}>
          <h1 >TODOMATE</h1>
        <p>Empower your day, one task at a time</p>
        <p>Create an account</p>
        <SignUpForm />
          </div>
       
        </section>
     )
}