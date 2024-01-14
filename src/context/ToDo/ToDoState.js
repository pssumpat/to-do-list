import ToDoContext from "./ToDoContext";
import { useState,useContext } from "react";
import AlertContext from "../Alert/AlertContext";

const ToDoState = (props) => {
  const baseUrl = "http://localhost:5000/";
  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;
  const [todos, setTodos] = useState([]);

  // Get all Notes
  const getAllTodos = async () => {
    // API Call
    const getTodosUrl = baseUrl + "api/todos/fetchalltodos";
    const response = await fetch(getTodosUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setTodos(json);
  };

  // Add Todos
  const addTodo = async (todo) => {
    // API Call
    const addUrl = baseUrl + "api/todos/savetodos";
    const response = await fetch(addUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({
        task: todo.task,
        description: todo.description,
        status: todo.status,
      }),
    });
    const json = await response.json();
    setTodos(todos.concat(json));
    showAlert("Todo Added Successfully","success");
  };

  // Delete Note
  const deleteTodo = async (id) => {

    // API call
    const dltTodoUrl = baseUrl + `api/todos/deletetodo/${id}`;
    const response = await fetch(dltTodoUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      }
    });

  //  Delete on Client Side
    const newTodos = todos.filter((todo) => {
      return todo._id !== id;
    });
    setTodos(newTodos);
    showAlert("Todo Deleted Successfully","success");
  };

  // Edit Note
  const editTodo = async (todo) => {
    // API call
    const editUrl = baseUrl + `api/todos/updatetodo/${todo.id}`;
    const response = await fetch(editUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({
        task: todo.etask,
        description: todo.edescription,
        status: todo.estatus,
      }),
    });
    const newTodos = JSON.parse(JSON.stringify(todos));
    for (let index = 0; index < newTodos.length; index++) {
      if(newTodos[index]._id === todo.id)
      {
        const elem = newTodos[index];
        elem.task = todo.etask;
        elem.description = todo.edescription;
        elem.status = todo.estatus;
        setTodos(newTodos);
      showAlert("Todo Edited Successfully","success");
        break;
      }
    }
  };

  return (
    <ToDoContext.Provider
      value={{ todos, setTodos, addTodo, deleteTodo, editTodo, getAllTodos }}
    >
      {props.children}
    </ToDoContext.Provider>
  );
};

export default ToDoState;
