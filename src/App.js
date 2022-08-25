import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './compenents/ToDoList';
import { v4 as uuidv4, v4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoName = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
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
      return [...prevTodos, { id: v4(), name: name, complete: false }]
    })
    todoName.current.value = null
  }

  function handleDeleteItem() {
    const newList = todos.filter(todo => !todo.complete)
    setTodos(newList)
  }

  return (
    <>
      <div>{todos.filter(todo => !todo.complete).length} items left!</div>
      <input ref={todoName} type="text" />
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleDeleteItem}>Delete Checked-off Items</button>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
    </>
  );
}

export default App;
