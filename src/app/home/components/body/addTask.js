"use client";
import { useState, forwardRef, useContext } from "react";
import styles from "../../page.module.css";
import Image from "next/image";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import { navStatus } from "@/app/provider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTask(props) {
  const { showNav } = useContext(navStatus);
  const { task } = useParams();
  const [dueDate, setDueDate] = useState(undefined);
  const [formValue,setFormValue] = useState('')
  const { setTodo, mutate, todo,userId } = props;
 
  function handleDateChange(date) {
    let parameterDate = date.toString();
    let formattedDate = parameterDate.substring(0, 15);

    setDueDate(date);
  }
  
  function addTodo() {
    if (!formValue) {
      return console.log("please add a todo");
    }
    let newTodo = {
      todoId: nanoid(),
      description: formValue,
      important: task ==='important'?true:false,
      categoryId: task,
      dueDate: dueDate ? dueDate.toString() : null,
      categoryDescription : props.category ? props.category.description  : null ,
      userId: userId,
      completed : false
    };
    let todoCopy = [newTodo, ...todo];
    mutate({
      isDelete: false,
      data: newTodo,
    });
    setTodo(todoCopy);
    setDueDate(undefined);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(formValue){
     addTodo()    
    }
    setFormValue('') 
  }
   
  return (
    <main className={styles.task_component}>
      <div className={styles.add_Todo}>
        <Image
          className={styles.checked}
          height={20}
          width={20}
          src={ "/circle.svg"}
          alt="grey circle"
        />
        <form onSubmit={onSubmit}>
          <input
           className={styles.main_input}
           name="todo"
           placeholder={"Add a Todo"}
           value = {formValue}
           onChange={(e)=>setFormValue(e.target.value) }
           />
        </form>
       
      </div>
      <div className={styles.additional_input}>
        {typeof window==='object' && window.innerWidth < 591 ? (
          !showNav && (
            <DatePickerComp
              onDateChange={handleDateChange}
              startDate={dueDate}
            />
          )
        ) : (
          <DatePickerComp onDateChange={handleDateChange} startDate={dueDate} />
        )}
        <input
          className={styles.add_button}
          type="image"
          height="29"
          width="29"
          src="/plus_icon.svg"
          alt="add todo"
          onClick={() => {
            if(formValue){
              addTodo()  
              setFormValue('') 
            }
          }}
        />
      </div>
    </main>
  );
}

const DatePickerComp = (props) => {
  let dateString;
  let subStr;
  if (props.startDate) {
    dateString = props.startDate.toString();
    subStr = dateString.substring(0, 15);
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <span onClick={onClick} ref={ref} className={styles.date_container}>
      <Image
        src="/calender_icon.svg"
        height={20}
        width={20}
        alt="calender icon"
        className={styles.extra_features_components}
      />
      {subStr && <div>due {subStr}</div>}
    </span>
  ));
  return (
    <DatePicker
      selected={props.startDate}
      onChange={(date) => props.onDateChange(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};
