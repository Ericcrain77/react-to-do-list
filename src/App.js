import React, { useState, useRef, useEffect } from 'react';
import './app.css';
import ToDoList from './compenents/ToDoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoName = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newList = [...todos];
    const todo = newList.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newList)
  }

  function handleAddItem(e) {
    const name = todoName.current.value
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoName.current.value = null
  }

  function handleDeleteItem() {
    const newList = todos.filter(todo => !todo.complete)
    setTodos(newList)
  }

  return (
    <div className='container'>
      <div className='items-left'>{todos.filter(todo => !todo.complete).length} items left!</div>
      <input ref={todoName} type="text" className='items-input' />
      <button onClick={handleAddItem} className='btn'>Add Item</button>
      <button onClick={handleDeleteItem} className='btn'>Delete Checked-off Items</button>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
