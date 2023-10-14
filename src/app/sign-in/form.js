'use client'
import React,{useState} from  'react'
import Image from 'next/image'
import Link from 'next/link'    
import styles from './page.module.css'
import axios from  'axios'
import { signIn } from 'next-auth/react'
export default function SignInForm(){
      const[formData,setFormData] = useState ({
         email : '',
         password :''
      })
      function handleChange(e){
        setFormData(prev=>{
           return {
             ...prev,
             [e.target.name] : e.target.value
           }
        })
      }     
         function handleSubmit(){
            signIn("credentials")
         }

      async  function handleGoogleAuth(){
          try {
            const {data:{csrfToken}} =  await getCsrfToken()
               
            const  rowToken = {
                   csrfToken : csrfToken
              }
                   const formData = new URLSearchParams(rowToken).toString()
                  
               const res  =  await axios.post('http://localhost:3000/api/auth/signin/google',formData,{
                  headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                   }
               })
                 console.log(res)
              console.log('auth process started....') 
          } catch (error) {
            console.debug(error)
            console.log("cleophas is out tonight getting dinner for the familya o")
            console.log('error occurred starting the auth process')    
          }
          }   
         async  function getCsrfToken (){
             try{
              return  await axios.get('http://localhost:3000/api/auth/csrf')
              
             }catch(error){
                 console.log('error occurred getting the crsf token',error)
             }
          }
     return (
       <div className={styles.form_holder} >
      
        <div className={styles.google_signup}  onClick={()=>
              signIn("google")
        }>
         <Image className={styles.google_icon}  src='/google.svg' alt='google icon' width={25} height={25} />
         <p >login with Google</p>     
         
        </div>
      
        </div>
     )
}
      
/* for adding email auth later on..

  <form className={styles.signup_form} >
         <label htmlFor='email'>Email</label> 
         <input type='text' value={formData.email} id='email' name='email' onChange={(e)=>{handleChange(e)} } placeholder='Enter your email' /> 
         <label htmlFor='password' >password</label> 
        <input type='text' value={formData.password} id='password' name='password'  onChange={(e)=>{handleChange(e)}} placeholder='Enter your password' />
        
        <button onClick={handleSubmit} >sign in</button>
      
        </form>
        <p className={styles.forgot_password}>Forgot password?</p>
        <p className={styles.link_create_account}>Don’t have an account?<span><Link href='/sign-up' >Sign-up</Link></span></p>
        <h5 className={styles.signup_form}>OR</h5>
*/