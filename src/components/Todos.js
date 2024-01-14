import React, { useContext, useEffect, useRef, useState } from "react";
import ToDoContext from "../context/ToDo/ToDoContext";
import {useNavigate} from 'react-router-dom';
import TodoItem from "./TodoItem";

export default function Todos() {
  const context = useContext(ToDoContext);
  const { todos, editTodo, getAllTodos } = context;
  const [todo, setTodo] = useState({id:"", etask: "", edescription: "", estatus: "" });

  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token"))
    {
      getAllTodos();
    }
    else{
      navigate("/login");
    }
    
  }, []);

  const updateTodo = (currentTodo) => {
    setTodo({id: currentTodo._id, etask : currentTodo.task, edescription : currentTodo.description, estatus : currentTodo.status});
    ref.current.click();
  };

  const handleClick = (e) => {
    editTodo(todo);
    refClose.current.click();
  };

  const onChange = (e) => {
    setTodo({...todo,[e.target.name]:e.target.value});
  };

  return (
    <div className="container">
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" >Launch demo modal</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"> {" "}Edit Todo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="task" className="form-label">Task</label>
                <input type="text" className="form-control" id="etask" name="etask" value={todo.etask} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">  Description </label>
                <textarea className="form-control"  id="edescription" name="edescription" rows="3" value={todo.edescription} onChange={onChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label"> Status</label>
                {/* <input type="email" className="form-control" name="estatus" id="estatus" value={todo.estatus} onChange={onChange}/> */}
                <select className="form-select" name='estatus' aria-label="Default select example" value={todo.estatus} onChange={onChange}>
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
           <button disabled={todo.etask < 5 || todo.edescription < 5 || todo.estatus<3} type="button" onClick={handleClick} className="btn btn-dark">
                Save Todo
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3>Your Todos</h3>
      <div className="row my-3">
        <div className="container">{todos.length === 0 && "Please add todos."}</div>
        {todos.map((todo) => {
          return (
            <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} />
          );
        })}
      </div>
    </div>
  );
}
