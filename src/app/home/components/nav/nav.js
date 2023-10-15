"use client";
import styles from "../../page.module.css";
import "../../page.module.css";
import { useState, useEffect } from "react";
import { itemsContext } from "../provider";
import Nav from "./navComponent.js";
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const client = new QueryClient();
export default function NavContainer({ categories, userId }) {
  return (
    <>
      <QueryClientProvider client={client}>
        <Container userId={userId} categories={categories} />
      </QueryClientProvider>
    </>
  );
}

function Container(props) {
  const [listItems, setListItems] = useState(props.categories);
  const mutation = useMutation({
    mutationFn: editCategories,
    networkMode: "online",
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
  });
  const dataToPassDown = {
    listItems: listItems,
    setListItems: setListItems,
    editCategories: initEditCategories,
    userId: props.userId,
    reRouteAfterDelete: reRouteAfterDelete,
  };
  const router = useRouter();
  function reRouteAfterDelete() {
    let link = "/home/all-tasks";
    router.replace(link);
  }

  async function editCategories(dataArg) {
    if (dataArg.id === "add") {
      const data = JSON.stringify(dataArg.dataArg);
      return axios.post(
        `https://todomate-psi.vercel.app/write/categories`,
        data
      );
    }
    if (dataArg.id === "delete") {
      return axios.get(
        `https://todomate-psi.vercel.app/remove/categories?categoryId=${dataArg.dataArg.categoryId}`
      );
    }
  }
  function initEditCategories(id, data) {
    let dataArg = {
      id: id,
      dataArg: data,
    };
    mutation.mutate(dataArg);
  }

  return (
    <main className={styles.nav_container}>
      <itemsContext.Provider value={dataToPassDown}>
        <Nav />
      </itemsContext.Provider>
    </main>
  );
}
