import React from 'react'
import ToDos from './ToDos';

export default function ToDoList({ todos, toggleTodo }) {
  return (
    todos.map(todo => {
      return <ToDos key={todo} todo={todo} toggleTodo={toggleTodo} />
    })
  )
}
