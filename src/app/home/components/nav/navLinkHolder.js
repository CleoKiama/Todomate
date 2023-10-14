import { itemsContext } from "../provider.js";
import Link from "next/link";
import { useState, useContext, useEffect, useRef } from "react";
import styles from "../../page.module.css";
import Editor from "./Editor.js";
import { useParams, useRouter } from "next/navigation.js";
import Image from "next/image";
import { navStatus } from "@/app/provider.js";
export default function NavLinkHolder(props) {
  const { setShowNav } = useContext(navStatus);
  const { listItems, setListItems, editCategories } = useContext(itemsContext);
  let link = `/home/${listItems[props.index].categoryId}`;
  const chooseClass = () => {
    let { task } = useParams();
    if (task === listItems[props.index].categoryId) {
      return {
        backgroundColor: "rgb(204, 198, 203)",
      };
    }
    return {};
  };
  function checkWidth() {
    if (window.innerWidth < 591) {
      setShowNav(false);
    }
  }
  const router = useRouter();
  let addStyle = chooseClass();
  return (
    <div
      onClick={(e) => {
        router.replace(link);
        checkWidth();
      }}
      className={styles.link_container}
      style={addStyle && addStyle}
    >
      {props.renderInput === 1 ? (
        <FormInput index={props.index} onBlur={props.onFormInputBlur} />
      ) : (
        <>
          <Image
            className={styles.category_image}
            src="/square.svg"
            alt="description icon"
            height={15}
            width={15}
          />
          {listItems[props.index].description}
          <Editor
            renderEditor={props.render}
            toggleRender={props.toggleRender}
            handleEdit={props.handleEdit}
            index={props.index}
          />
        </>
      )}
    </div>
  );
}

function FormInput(props) {
  const [formValue, setFormValue] = useState("");
  const inputRef = useRef(null);
  const { listItems, setListItems, editCategories } = useContext(itemsContext);
  function handleChange(e) {
    const { value } = e.target;
    setFormValue(value);
  }
  useEffect(() => {
    setFormValue(listItems[props.index].description);
  }, [listItems[props.index].description]);
  function editListItem(e) {
    e.preventDefault();
     if (!formValue) 
       
    setListItems((prev) =>
      prev.map((current, index) => {
        if (index === props.index) {
            if(current.description!==formValue){
          editCategories("add", {
            category: {
              categoryId: current.categoryId,
              description: formValue,
              userId: current.userId,
            },
          }); 

           }
          return {
             ...current,
            description: formValue,
          };
        }
        return current;
      })
    ); 
  }

  function handleBlur() {
    if (formValue !== listItems[props.index].description) {
      console.log("something changed");
    }
    setTimeout(props.onBlur, 150);
  }

  useEffect(() => {
    // Focus the input element when it mounts
    inputRef.current.focus();
  }, []);

  return (
    <form className={styles.input_container}>  
      <input
        type="text"
        ref={inputRef}
        value={formValue}
        onChange={handleChange}
        onBlur={handleBlur}
        name="list name"
        className={styles.edit_input}
      />
         <input
        type="image"
        src="/unchecked.svg"
        alt="plus sign"
        height={5}
        width={5}
        onClick={editListItem}
        className={styles.add_input}
      /> 
       <input
        type="image"
        src="/cancel_close_delete_icon.svg"
        height={15}
        width={15}
        alt="cancel icon"
        className={styles.cancel_input}
      /> 
    </form>
  );
}
