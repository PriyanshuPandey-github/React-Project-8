import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {removeTodo, updateTodo, toggleTodo} from '../features/todo/todoSlice'

function TodoItem({todo}) {
  const dispatch = useDispatch()
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState('')
  const [inputRef, setInputRef] = useState(null)

  const toggleCompletedHandler = (e) => {
    dispatch(toggleTodo(e.target.id))
  }

  const deleteTodoItem = (e) => {
    dispatch(removeTodo(todo.id))
  }

  const editTodoHandler = (e) => {
    setIsTodoEditable(true)
    setTodoMsg(e.target.value)
  }

  const saveTodoHandler = (e) => {
    setIsTodoEditable(false)
    dispatch(updateTodo({id: todo.id, title: todoMsg}))
  }

  const cancelTodoHandler = (e) => {
    setIsTodoEditable(false)
  }

  const focusInputHandler = () => {
    inputRef.current.focus()
  }

  const blurInputHandler = () => {
    inputRef.current.blur()
  }
  useEffect(() => {
    setTodoMsg(todo.title);
  }, [todo.title]);

  useEffect(() => {
    setIsTodoEditable(false);
  }, [todo.completed]);

  return (
    <div
      className={`flex mb-1 border border-gray-600/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-gray-600/50 duration-300  text-white ${
        todo.completed ? "bg-[#1f7a11] line-through" : "bg-[#2d3748]"
      } text-lg`}
      key={todo.id}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        id={todo.id}
        onChange={toggleCompletedHandler}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-gray-600/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        ref={inputRef}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-600/10 justify-center items-center bg-gray-600/50 hover:bg-gray-600/70 shrink-0 disabled:opacity-50 text-lg"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            saveTodoHandler({id: todo.id});
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "✅" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-600/10 justify-center items-center bg-gray-600/50 hover:bg-gray-600/70 shrink-0 text-lg"
        onClick={deleteTodoItem}
      >
        ❌
      </button>
    </div>
  );

}

function Todos() {
  const todos = useSelector(state => state.todos)
  return (
    todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ))
  );
}

export default Todos;


