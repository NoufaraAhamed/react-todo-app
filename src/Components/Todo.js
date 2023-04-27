import React from 'react'
import './Todo.css'
import { useState, useRef, useEffect } from 'react'
import { IoMdDoneAll } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'


function Todo() {

  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId,setEditId]=useState(0)

  const addTodo = () => {
    if(input !== ''){
    setTodos([...todos, 
      { id:Date.now(), 
        time:new Date().toLocaleTimeString(),
        text:input, 
        status:false }])
    setInput('')
  }
  if(editId){
    const  editTodo = todos.find((todo)=>todo.id === editId)
    const updateTodo= todos.map((todo)=>todo.id === editTodo.id ?
    (todo={id:todo.id , text:input, time:todo.time}) :
    (todo={id:todo.id , text: todo.text , time:todo.time}))
    setTodos(updateTodo)
    setEditId(0)
    setInput('')
  }
  }

  const inputRef = useRef('null')

  useEffect(() => {
    inputRef.current.focus();
  })
 
  const handleSubmit = (e) => {
    e.preventDefault();

  }

  const onDelete = (id) =>{
   setTodos(todos.filter(todo=> todo.id !== id))
  }

  const onComplete =(id)=>{
    let complete = todos.map((todo)=>{
      if(todo.id === id){
        return({...todo, status:!todo.status})
      }
      return todo
    })
    setTodos(complete)
  }

  const onEdit =(id)=>{
   const editTodo= todos.find(todo=> todo.id === id)
   setInput(editTodo.text)
   setEditId(editTodo.id)
  }
 

  return (
    <div className='container'>
      <h2>TODO APP</h2>
      <h5>it's {new Date().toDateString()}</h5>
      <form className='form-group' onSubmit={handleSubmit}>
        <input type="text" value={input} ref={inputRef} placeholder='Enter your todo...' className='form-control' onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTodo}>{editId ? 'Edit' : 'ADD'}</button>
      </form>

      <div className='list'>
        <ul>
          {todos.map((item, index) => (
            <li className='list-items' key={item.id}>
              <div className='list-item-list' id={item.status ? 'todo-item' : ''}>{item.text}</div>

              <span className='list-item-time'>{item.time}</span>
            
                <span>
                <IoMdDoneAll 
                className='list-item-icons' 
                title='Completed'
                onClick={()=>onComplete(item.id)}  
                />

                <FiEdit 
                className='list-item-icons' 
                title='Edit' 
                onClick={()=>onEdit(item.id)}
                />

                <MdDelete className='list-item-icons' 
                title='Delete' 
                onClick={()=>onDelete(item.id)}/>
                
              </span>
            </li>
          ) 

          )}
        </ul>
      </div>


    </div>
  )
}

export default Todo
