"use client";
import { useState, useEffect } from "react";
import AddTask from "./body/addTask.js";
import { nanoid } from "nanoid";
import RenderTasks from "./body/renderTasks.js";
import styles from "../page.module.css";
import { useParams } from "next/navigation";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { render } from "react-dom";
const queryClient = new QueryClient();
export default function Main(props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Encapsulate userId={props.userId} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={1}
        />
      </QueryClientProvider>
    </>
  );
}
function Encapsulate(props) {
  const { task } = useParams();
  async function fetchTodos() {
    return axios.get(
      `http://localhost:3000/write/tasks?categoryId=${task}&userId=${props.userId}`
    );
  }
  const { isLoading, isError, data, error, isPaused } = useQuery({
    queryKey: [task],
    queryFn: fetchTodos,
    refetchOnWindowFocus: false,
    networkMode: "always",
  });
  let result;
  if (isLoading && !isPaused) {
    return (
      <div className={styles.loading_spinner}>
        <Oval
          height={40}
          width={40}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
 function renderToast() {
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
  toast.clearWaitingQueue();
 }
  if (isError) {
    return renderToast()
  }
  result = data.data;

  return (
    <>
      <Body category={result.category} userId={props.userId} result={result.tasks} />
    </>
  );
}
function Body(props) {
  const { task } = useParams();
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    setTodo(props.result);
  }, [props.result]);
  async function postTodo(data) {
    if (data.isDelete) {
      return axios.get(
        `http://localhost:3000/remove/tasks?taskId=${data.data}`
      );
    }
    return axios.post(`http://localhost:3000/write/tasks`, data.data);

  }
  const mutation = useMutation({
    mutationFn: postTodo,
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
  function mutate(dataArg) {
    if (dataArg.isDelete) {
      return mutation.mutate({
        isDelete: true,
        data: dataArg.data,
      });
    }

    let dataToSend = {
      task: dataArg.data,
    };
    const data = JSON.stringify(dataToSend);
    mutation.mutate({
      isDelete: false,
      data: data,
    });
  }

  function toggleImportant(id) {
    let newTodo = todo.map((currentTodo) => {
      if (currentTodo.todoId === id) {
        return {
          ...currentTodo,
          important: !currentTodo.important,
        };
      }
      return currentTodo;
    });
    setTodo(newTodo);
  }  
    function listenONlineStatus () {
      var id
      if (typeof window==='object') {
        console.log('setting the online status callback')
        window.addEventListener('offline',()=>{
          id  = toast.error('"Offline Mode: Your changes will be saved once you regain internet connectivity."', {
            position: "bottom-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          toast.clearWaitingQueue();
        })
        window.addEventListener('online',()=>{
                toast.dismiss(id)
        })
      }
    }
    listenONlineStatus()
  return (
    <main className={styles.main_body}>
      <h5>{props.category ? props.category.description : task}</h5>
      <AddTask
        setTodo={setTodo}
        mutate={mutate}
        todo={todo}
        category={props.category}
        userId={props.userId}
      />
      <Render
        mutate={mutate}
        setTodo={setTodo}
        todo={todo}
        toggleImportant={toggleImportant}
        category={props.category}
      />
    </main>
  );
}

function Render(props) {
  const { task } = useParams();
  const { todo, setTodo } = props;
  const [renderState, setRenderState] = useState([]);
  useEffect(() => {
    let s = todo.length;
    let newState = [];
    while (s > 0) {
      newState.push({
        isStyled: 0,
        isInputRendered: 0,
      });
      s -= 1;
    }
    setRenderState(newState);
  }, [todo]);

  if (todo.length === 0 || renderState.length !== todo.length) {
    return <></>;
  }
  let tasksElements;
  if (task !== "completed") {
    let filteredTodo = todo.filter((current) => !current.completed);
    tasksElements = filteredTodo.map((task, index) => {
      return (
        <RenderTasks
          key={nanoid()}
          todo={task}
          toggleImportant={props.toggleImportant}
          index={index}
          setTodo={setTodo}
          mutate={props.mutate}
          todoArr={todo}
          setRenderState={setRenderState}
          isInputRendered={renderState[index].isInputRendered}
          isStyled={renderState[index].isStyled}
          category={props.category}
        />
      );
    });
  } else {
    tasksElements = todo.map((task, index) => {
      return (
        <RenderTasks
          key={nanoid()}
          todo={task}
          toggleImportant={props.toggleImportant}
          index={index}
          setTodo={setTodo}
          mutate={props.mutate}
          todoArr={todo}
          setRenderState={setRenderState}
          isInputRendered={renderState[index].isInputRendered}
          isStyled={renderState[index].isStyled}
          category={props.category}
        />
      );
    });
  }
  return <>{tasksElements}</>;
}
