import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action)=>{
            const todo = {
                id: nanoid(),
                title: action.payload,
                completed: false
            }
            state.todos.push(todo)
        },
        toggleTodo: (state, action)=>{
            const index = state.todos.findIndex(todo => todo.id === action.payload)
            if(index >= 0){
                state.todos[index].completed = !state.todos[index].completed
            }
        },
        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        },
        updateTodo : (state, action)=>{
            const index = state.todos.findIndex(todo => todo.id === action.payload.id)
            if(index >= 0){
                state.todos[index].title = action.payload.title
            }
        }
    }
})

export const {addTodo, removeTodo, updateTodo, toggleTodo} = todoSlice.actions
export default todoSlice.reducer