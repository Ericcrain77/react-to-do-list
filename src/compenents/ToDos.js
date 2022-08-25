import React from 'react'

export default function ToDos({ todo, toggleTodo }) {
    function handleTodoCheck() {
        toggleTodo(todo.id)
    }
    
  return (
    <div className='list'>
        <label>
          <input type="checkbox" checked={todo.complete} onChange={handleTodoCheck} className='checkbox' />
          {todo.name}
        </label>
    </div>
  )
}
