'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import {useState,useEffect, useContext} from 'react'
import { signOut } from "next-auth/react"
import { navStatus } from "@/app/provider.js";
export default function HeaderComponent ({name,email,profileUrl}) {
       const {setShowNav,showNav} =  useContext(navStatus)
       const [isOpen,setIsOpen] = useState(false)
     
              useEffect(()=>{
                function globalClickHandler() {
                   setIsOpen(false)
                }
                    if(isOpen) {
                     window.addEventListener('click',globalClickHandler)
                    }else{
                      window.removeEventListener('click',globalClickHandler)
                    }
                return ()=>{
                  window.removeEventListener('click',globalClickHandler)
                }
              },[isOpen])
      
        function handleClick(e) { 
            e.stopPropagation()
            setIsOpen(prev=>!prev)
           if(window.innerWidth<591&&showNav) {
              setShowNav(false)
            }
          
        }
              
    return ( 
        <header className={styles.header_main_container} >
            <div className={styles.heading_container}>
            <h1>TodoMate</h1>
            <div className={styles.conditionally_rendered_profile} >
            <Image 
        className={styles.image_user}
        src={profileUrl}   
        height={45}
        width={42} 
        alt='user image'  
        onClick={handleClick}
           />{
            isOpen&&
        <Profile  name={name}  email={email} profileUrl={profileUrl} />
           }
            </div>
          
          </div>
         
        </header>
    )   
}     
    
function Profile ({name,email,profileUrl}) {
 
    return  (
         <div  id='profile_dialog'  className={styles.profile_holder} >
            <div className={styles.dialog_content_container}>
            <Image 
        className={styles.dialog_user_image }
        src={profileUrl}   
        height={85}
        width={82} 
        alt='user image'  
        //onClick={handleClick}
           />   
            
          <div className={styles.name_credentials}>
          <p>{'cleophas kiama Ngumo'}</p>
          <p>{email}</p>
         <button onClick={()=>{signOut({callbackUrl:'http://localhost:3000/home/me'})}} >sign out</button>
          </div> 

            </div>
         
         </div >
    )
}


 