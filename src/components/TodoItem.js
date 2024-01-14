import React, { useContext } from "react";

import ToDoContext from "../context/ToDo/ToDoContext";

export default function TodoItem(props) {
  const context = useContext(ToDoContext);
  const { deleteTodo } = context;
  const {todo, updateTodo} = props;
  const timestamp = todo.date;
  const date = new Date(timestamp);
  const fullDate = date.toDateString();
  const time = date.toTimeString().replace('GMT+0530 (India Standard Time)',"");
  const bgColor = (todo.status === 'done'? '#ccf9dd' : '#ffdbdb');
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body" style={{backgroundColor: bgColor}}>
          <div className="d-flex">
            <h5 className="card-title fw-light"> {todo.task}</h5>
            <div className="ml-auto">
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={()=>{updateTodo(todo)}}
              ></i>
              <i className="fa-solid fa-trash mx-2"
              onClick={() => {deleteTodo(todo._id)}}></i>
             
            </div>
          </div>
          <p className="card-text">{todo.description}</p>
          <p style={{fontSize:'12px'}} className="card-text"><i>{fullDate} | {time}</i></p>
        </div>
      </div>
    </div>
  );
}
