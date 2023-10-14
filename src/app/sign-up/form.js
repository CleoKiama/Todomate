'use client'
import React,{useState} from  'react'
import Image from 'next/image'
//import Link from 'next/link'
import styles from './page.module.css'
import axios from 'axios'

export default function SignUpForm(){
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
            //'http://localhost:3000//test-route/test/route.js'
         function submit(){
                const data =  JSON.stringify(formData)
              axios.get('http://localhost:3000/test-route/test/route.js',data)
              .then((data)=>{
                console.log(data)
              }).catch(error=>{
                console.log(error)
              })
         }
     return (
       <div className={styles.form_holder} >
        <form className={styles.signup_form} >
         <label htmlFor='email'>Email</label> 
         <input type='text' value={formData.email} 
         id='email' name='email' 
         onChange={(e)=>{handleChange(e)} } 
         placeholder='Enter your email' /> 
         <label htmlFor='password' >password</label> 
        <input type='text' 
        value={formData.password} 
        id='password'
         name='password'  
         onChange={(e)=>{handleChange(e)}}
          placeholder='Enter your password' 
          />
        
        <button type='submit'>sign up</button>
      
        </form>
       
       
        <h5 >OR</h5>
        <div className={styles.google_signup}>
         <Image className={styles.google_icon}  src='/google.svg' alt='google icon' width={25} height={25} />
         <p onClick={submit}>sign up with Google</p>     
         
        </div>
      
        </div>
     )
}
