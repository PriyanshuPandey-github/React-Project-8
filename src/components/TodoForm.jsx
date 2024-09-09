import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../features/todo/todoSlice'
function TodoForm() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e)=>{
        e.preventDefault()
        dispatch(addTodo(input))
        setInput('')
    }
    return (
        <form  onSubmit={addTodoHandler}  className="flex mb-2">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-gray-700 rounded-l-lg px-3 outline-none duration-150 bg-gray-800 py-1.5 text-white text-lg"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-500 text-white shrink-0 text-lg">
                Add
            </button>
        </form>
    );
}

export default TodoForm

