"use client"
import styles from '../../page.module.css'
import {useState,useContext,useEffect} from 'react'
import  {navStatus} from '@/app/provider.js'
import Image from 'next/image'
import { itemsContext } from "../provider"
import { nanoid } from 'nanoid'
import NavLinkHolder from './navLinkHolder.js'
import DefaultLinks from './defaultlinks'
import { useRouter } from "next/navigation.js"
export default function Nav({children}){
    const {showNav} =  useContext(navStatus)
    const{listItems,setListItems,editCategories,userId} = useContext(itemsContext)
    const[formValue,setFormValue]= useState('')
    const[placeHolder,setPlaceHolder] = useState('Create new List') 
    const[editorState,setEditorState] = useState([]) 
    const[inputState,setInputState]  = useState([])
    const router = useRouter()
   
     useEffect(() => {
      if (listItems.length === 0) return;
     const numZerosToAdd = listItems.length - editorState.length;
       if (numZerosToAdd > 0) {
        const newZeros = Array(numZerosToAdd).fill(0);
        setInputState(prevState => [...prevState, ...newZeros])
       
        return setEditorState(prevState => [...prevState, ...newZeros]);
      } 
        const numElementsToRemove = Math.abs(numZerosToAdd);
        setInputState(prevState => prevState.slice(0, -numElementsToRemove));
        setEditorState(prevState => prevState.slice(0, -numElementsToRemove));
    }, [listItems.length]);
   
    function handleChange(e) {
      const{value} = e.target 
      setFormValue(value)
    }
      function addListItems(e) {
        e.preventDefault() 
         if(!formValue) {
          return console.log('please add a list item first ')
        }  
        let dataToSend = {
          category :  {
            categoryId : nanoid(),
            description : formValue,
            //remember to swap for the  Id of the users from session
            userId : userId
          }
        }
        let listItemsCopy = [
          ...listItems,
          {
            ...dataToSend.category
          }
         ]  
        setListItems(()=>listItemsCopy )
        setFormValue('')
        editCategories('add',dataToSend)
        let link = `/home/${dataToSend.category.categoryId}`
         router.replace(link)
    }
      function toggleRender(e,pIndex) { 
            e.stopPropagation()
           setEditorState((prev)=>{
              return prev.map((current,index)=>{
                   if(index===pIndex) {
                       if(current===1) return 0
                       return 1
                   }
                   return 0
              })
           })
  
      }
     function handleEdit(e,pIndex) {
         e.stopPropagation()
       setInputState((prev)=>{
        return prev.map((current,index)=>{
             if(index===pIndex) {
                 if(current===1) return 0
                 return 1
             }
             return 0
        })
     })
     }
     
           useEffect(()=>{
              let state ={
                isOpen :false,
                index : undefined
              }
              function globalClick() {
                setEditorState((prev)=>{
                  return prev.map((current,index)=>{
                       if(index===state.index) {
                          return 0
                       }
                       return 0
                  })
               })
              }
              for(let s=0;s<editorState.length;s++){
                  if(editorState[s]===1){
                     state.isOpen = true 
                     state.index = s
                     break
                  }
              }
              if(state.isOpen){
                 window.addEventListener('click',globalClick)
              }else{
                window.removeEventListener('click',globalClick)
              }
               return ()=>{
                window.removeEventListener('click',globalClick)
               }
           },[editorState])
            
           function handleFocus (e) {
            setPlaceHolder('list name')
           }
        function handleBlur() {
           setPlaceHolder('create new List')
           }
          function formInputBlur(){
            setInputState((prev)=> prev.map(()=> 0))
          }
    var listItemElements = listItems.map((item,index)=>{
          return <NavLinkHolder 
           key={nanoid()}
           render={editorState[index]}
           renderInput = {inputState[index]}
           toggleRender={(e)=>toggleRender(e,index)}
           index={index}
           handleEdit={(e)=>{handleEdit(e,index)}}
           onFormInputBlur ={formInputBlur}
           />
      })
     
    
       
  return(
      <div >
      {
      showNav &&
     <nav className={styles.nav}> 
      <DefaultLinks  />
         <hr className={styles.hr} />
      <ul  >
        {listItemElements}
      </ul>
      <form
       onSubmit={(e)=>{
        e.preventDefault()
        addListItems()
      }} 
      className = {styles.input_container}
      >
     <input
      type='image'
      src='/plus_icon.svg'
      alt='plus sign' 
      height={20} 
      name='confirm button'
      width={20}
      onClick={addListItems}
      className={styles.main_input_image}
      /> 
       <input 
      type= 'text'
      placeholder={placeHolder}
      value={formValue}
      onChange ={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={styles.nav_input}
      name='editing form'
     /> 
   </form>
 
      </nav>  
      }
      </div>
      
  )
}


