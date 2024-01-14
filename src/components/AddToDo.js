import React,{useContext, useState} from 'react'

import ToDoContext from "../context/ToDo/ToDoContext";

export default function AddToDo() {

    const context = useContext(ToDoContext);
    const { addTodo } = context;

    const [todo,setTodo] = useState({task:"", description:"", status:"pending"})

    const handleClick = (e) =>{
        e.preventDefault();
        addTodo(todo);
        setTodo({task:"", description:"", status:"pending"})
    }

    const onChange = (e) =>{
       setTodo({...todo, [e.target.name] : e.target.value})
    }

  return (
    <div className='container'>
      <h3>Add TO-DO</h3>
      <div className="mb-3">
        <label htmlFor="task" className="form-label">Task</label>
        <input type="text" className="form-control" id="task" value={todo.task} name="task" onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" name="description" rows="3" value={todo.description} onChange={onChange}></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label" name="status" >Status</label>
        {/* <input type="text" className="form-control" name="status" value={todo.status} id="status" onChange={onChange} /> */}
        <select className="form-select" name='status' aria-label="Default select example" defaultValue={'pending'} onChange={onChange}>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button disabled={todo.task < 5 || todo.description < 5 } type="submit" className="btn btn-dark mb-3"  onClick={handleClick}>Add Todo</button>
    </div>
  )
}
