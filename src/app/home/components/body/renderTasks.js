"use client";
import Image from "next/image";
import styles from "../../page.module.css";
import { useState, forwardRef, useEffect, useContext } from "react";
import EditInput from "./edit.js";
import DatePicker from "react-datepicker";
import { navStatus } from "@/app/provider";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "next/navigation";
import ConfirmDialog from "../confirmation/confirmation";
export default function RenderTasks(props) {
  const { task } = useParams();
  const { showNav } = useContext(navStatus);
  const { isInputRendered, isStyled, setRenderState } = props;
  let mockDate = new Date(props.todo.dueDate);
  const [formValue, setFormValue] = useState(props.todo.description);
  const [startDate, setStartDate] = useState(mockDate);
  const [imageState, setImageState] = useState({
    checkImageState: props.todo.completed,
    importantImageState: props.todo.important,
  });

  function handleChange(e) {
    const { value } = e.target;
    setFormValue(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let derivedIndex = props.index;
    props.setTodo((prev) =>
      prev.map((value, index) => {
        if (index === derivedIndex) {
          if (formValue !== value.description) {
            let newTodo = {
              ...value,
              description: formValue,
            };
            props.mutate({
              isDelete: false,
              data: newTodo,
            });
            return newTodo;
          }
        }
        return value;
      })
    );
    
  }
  function handleClick() {
    setRenderState((prev) =>
      prev.map((current, index) => {
        if (index === props.index) {
          return {
            ...current,
            isInputRendered: 1,
          };
        }
        return current;
      })
    );
  }

  function handleBlur() {
    let derivedIndex = props.index;
    props.setTodo((prev) =>
      prev.map((value, index) => {
        if (index === derivedIndex) {
          if (formValue !== value.description) {
            let newTodo = {
              ...value,
              description: formValue,
            };
            props.mutate({
              isDelete: false,
              data: newTodo,
            });
            return newTodo;
          }
        }
        return value;
      })
    );
    setRenderState((prev) =>
      prev.map((current, index) => {
        if (index === props.index) {
          return {
            ...current,
            isInputRendered: 0,
          };
        }
        return {
          ...current,
          isInputRendered: 0,
        };
      })
    );
  }
    
  function handleDelete() {
    props.setTodo((prev) =>
      prev.filter((value, index) => {
        if (index === props.index) {
          props.mutate({
            isDelete: true,
            data: value.todoId,
          });
        }
        return index !== props.index;
      })
    );
  }
  function toggleImportant(id) {
    if (task === "important") {
      return props.setTodo((prev) =>
        prev.filter((current) => {
          if (current.todoId === id) {
            let newTodo = {
              ...current,
              important: false,
            };
            props.mutate({
              isDelete: false,
              data: newTodo,
            });
          }
          return current.todoId !== id;
        })
      );
    }
    let newTodo = props.todoArr.map((currentTodo) => {
      if (currentTodo.todoId === id) {
        let newTodo = {
          ...currentTodo,
          important: !currentTodo.important,
        };
        props.mutate({
          isDelete: false,
          data: newTodo,
        });
        return newTodo;
      }
      return currentTodo;
    });
    props.setTodo(newTodo);
  }
  function handleComplete() {
    let newTodo = props.todoArr.filter((currentTodo) => {
      if (currentTodo.todoId === props.todo.todoId) {
        let newTodo = {
          ...currentTodo,
          completed: !currentTodo.completed,
        };
        props.mutate({
          isDelete: false,
          data: newTodo,
        });
      }
      return currentTodo.todoId !== props.todo.todoId;
    });
    props.setTodo(newTodo);
  }
  function handleDateChange(date) {
    let id = props.todo.todoId;
    let dateString = date.toString();
    let newTodo = props.todoArr.map((currentTodo) => {
      if (currentTodo.todoId === id) {
        let newTodo = {
          ...currentTodo,
          dueDate: dateString,
        };
        props.mutate({
          isDelete: false,
          data: newTodo,
        });
        return newTodo;
      }
      return currentTodo;
    });
    props.setTodo(newTodo);
    setStartDate(date);
  }
const textDecorate = task==='completed' ? {textDecoration:"line-through"} : {textDecoration :" none"}
  return (
    <>
      <div className={styles.section_holder}>
        <div
          onClick={() => {
            setTimeout(handleClick, 160);
          }}
          className={styles.parent_holder}
        >
          <Image
            className={styles.checked}
            height={20}
            width={20}
            src={
              imageState.checkImageState
                ? "/green_check_sign.svg"
                : "/circle.svg"
            }
            alt="grey circle"
            onClick={handleComplete}
            onMouseEnter={() =>
              setImageState((prev) => ({
                ...prev,
                checkImageState: !prev.checkImageState,
              }))
            }
            onMouseLeave={() =>
              setImageState((prev) => ({
                ...prev,
                checkImageState: props.todo.completed,
              }))
            }
          />
          {isInputRendered === 1 ? (
            <EditInput
              onBlur={handleBlur}
              formValue={formValue}
              onChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <p style={textDecorate}>{props.todo.description}</p>
          )}
          <Image
            onClick={() => {
              toggleImportant(props.todo.todoId);
            }}
            className={styles.star_icon}
            /*check if it possible to mess with the fill css props instead to the*/
            src={
              imageState.importantImageState 
                ? "/star_icon.svg"
                : "/unfilled_star_icon.svg"
            }
            height="25"
            width="25"
            alt="mark as important"
            onMouseEnter={() =>
              setImageState((prev) => ({
                ...prev,
                importantImageState: !prev.importantImageState,
              }))
            }
            onMouseLeave={() =>
              setImageState((prev) => ({
                ...prev,
                importantImageState: props.todo.important,
              }))
            }
          />
        </div>
        <div className={styles.extra_features}>
          {/*render the description if the route.legth is less that 10chars*/}
         {task.length < 15 && <div>{props.todo.categoryDescription}</div>  }
          {window.innerWidth < 591 ? (
            !showNav && (
              <DatePickerComp
                selected={startDate}
                onDateChange={handleDateChange}
                selectedDueDate={props.todo.dueDate}
              />
            )
          ) : (
            <DatePickerComp
              selected={startDate}
              onDateChange={handleDateChange}
              selectedDueDate={props.todo.dueDate}
            />
          )}
           <ConfirmDialog 
             dialogTitle={'Delete Todo'}
             dialogDescription={'This will delete the Todo.This action cannot be undone'}
             deleteConfirmed={handleDelete} 
             trigger={Trigger()}
           />
        </div>
      </div>
    </>
  );
}

const DatePickerComp = (props) => {
  let dateString;
  let subStr;
  if (props.startDate) {
    dateString = props.startDate.toString();
    subStr = dateString.substring(0, 15);  
  } else {
    if (props.selectedDueDate) {
      subStr = props.selectedDueDate.substring(0, 15);
    }
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

let Trigger = ()=>{
   return (
    <Image
    src="/delete_icon.svg"
    height={20}
    width={20}
    alt="delete icon"
  />
   )
}