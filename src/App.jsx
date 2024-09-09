import React from 'react'
import TodoForm from './components/TodoForm'
import Todos from './components/Todos'

function App() {
  return (
    <div className="bg-gray-900 h-screen">
      <div className='p-[50px]'>
        <TodoForm />
        <Todos />
      </div>
    </div>
  )
}

export default App
