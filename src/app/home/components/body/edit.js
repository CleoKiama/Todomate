import { useEffect, useRef } from "react";
import styles from "../../page.module.css";
export default function EditInput(props) {
  const inputRef = useRef(null);
  useEffect(() => {
    // Focus the input element when it mounts
    inputRef.current.focus();
  }, []);
  function handleBlur() {
    setTimeout(props.onBlur, 150);
  }
  return (
    <form
      className={styles.main_form}
      onBlur={handleBlur}
      onSubmit={props.handleSubmit}
    >
      <input
        type="text"
        value={props.formValue}
        onChange={props.onChange}
        ref={inputRef}
        name="task edit form"
      />
    </form>
  );
}
