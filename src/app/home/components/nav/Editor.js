"use client";
import { useContext } from "react";
import styles from "../../page.module.css";
import { itemsContext } from "../provider.js";
import Image from "next/image";
import { nanoid } from "nanoid";
import { redirect, useRouter } from "next/navigation";
import ConfirmDialog from "../confirmation/confirmation";
export default function Editor(props) {
  const { listItems, setListItems, editCategories, reRouteAfterDelete } = useContext(itemsContext);
  const router = useRouter();

  function initiateDelete() {
    setListItems((prev) =>
      prev.filter((element, index) => {
        if (index === props.index) {
          editCategories("delete", {
            categoryId: element.categoryId,
          });
        }
        return index !== props.index;
      })
    );
    let link = '/home/all-tasks'
    router.replace(link);
  }
  function onDuplicate() {
    let listItemsCopy = [...listItems];
    let index = props.index + 1;
    let value = {
      categoryId: nanoid(),
      description: listItems[props.index].description,
      userId: "OigXeGBnXuNtcYrfJfHlg",
    };

    editCategories("add", { category: value });
    listItemsCopy.splice(index, 0, value);
    setListItems(listItemsCopy);
  }

  let link = `/home/${listItems[props.index].categoryId}`;

  return (
    <div className={styles.more_functionality}>
      <Image
        src="/ellipsis_90.png"
        height={15}
        width={15}
        alt="ellipsis icon image"
        onClick={(e) => {
          props.toggleRender(e);
          router.replace(link);
        }}
      />
      {props.renderEditor === 1 && (
        <div className={styles.editor_container}>
            <Image
              src="/cancel_close_delete_icon.svg"
              height={15}
              width={15}
              alt="delete icon"
              className={styles.close_editor}
            />
          <div onClick={props.handleEdit} className={styles.action_container}>
            <Image
              src="/edit_icon.svg"
              height={15}
              width={15}
              alt="delete icon"
            />
            <p>edit</p>
          </div>
          <div onClick={onDuplicate} className={styles.action_container}>
            <Image
              src="/duplicate_icon.svg"
              height={15}
              width={15}
              alt="delete icon"
            />
            <p>duplicate</p>
          </div>
          <hr className={styles.delete_separator} />
          <ConfirmDialog
            dialogTitle={"Delete the category"}
            dialogDescription={`This will delete ${
              listItems[props.index].description
            }.This action cannot be undone`}
            deleteConfirmed={initiateDelete}
            trigger={Trigger()}
          />
        </div>
      )}
    </div>
  );
}

const Trigger = () => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.action_container}
    >
      <Image src="/delete_icon.svg" height={15} width={15} alt="delete icon" />
      <p>delete</p>
    </div>
  );
};
