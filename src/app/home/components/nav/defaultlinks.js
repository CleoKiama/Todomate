import Link from "next/link";
import styles from "../../page.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";
export default function DefaultLinks() {
  const { task } = useParams();
  return (
    <div className={styles.default_links}>
      <Link
        href="/home/all-tasks"
        style={
          task === "all-tasks"
            ? {
                backgroundColor: "rgb(204, 198, 203)",
              }
            : {
                backgroundColor: null,
              }
        }
        className={styles.image_link_holder}
      >
        <Image
          src="/home.svg"
          alt="description icon"
          height={23}
          width={23}
          className={styles.default_links_image}
        />
        <p id={styles.all_tasks_link}>All tasks</p>
      </Link>

      <Link
        href="/home/important"
        style={
          task === "important"
            ? {
                backgroundColor: "rgb(204, 198, 203)",
              }
            : {
                backgroundColor: null,
              }
        }
        className={styles.image_link_holder}
      >
        <Image
          src="/star_icon.svg"
          alt="description icon"
          height={23}
          width={23}
          className={styles.default_links_image}
        />
        <p>important</p>
      </Link>

      <Link
        href="/home/completed"
        style={
          task === "completed"
            ? {
                backgroundColor: "rgb(204, 198, 203)",
              }
            : {
                backgroundColor: null,
              }
        }
        className={styles.image_link_holder}
      >
        <Image
          src="/tick.svg"
          alt="description icon"
          height={23}
          width={23}
          className={styles.default_links_image}
        />
        <p>completed</p>
      </Link>
    </div>
  );
}
