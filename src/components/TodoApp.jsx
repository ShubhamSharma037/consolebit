import React, { useState, useRef} from 'react'
import classes from '../scss/TodoApp.module.scss'
import Task from './Task'

const TodoApp = () => {
    const [todos,setTodos] = useState([])
    const inputRef = useRef()

    const addTodo = (event)=>{
        event.preventDefault()
        if(inputRef.current.value.length >=1){
            const newtodos = [
                ...todos,
                {
                    task : inputRef.current.value,
                    isDone : false,
                }
            ]
            setTodos(newtodos)
            inputRef.current.value=''
        }
    }

    const markTodo = (index)=>{
        const newTodos = [...todos]
        newTodos[index].isDone = !todos[index].isDone
        setTodos(newTodos)
    }

    const editTodo = (index, updatedTodo)=>{
        const newTodos = [...todos]
        newTodos[index] = {
            ...newTodos[index],
            task : updatedTodo
        }
        setTodos(newTodos)
    }

    const deleteTodo = (index)=>{
        const newTodos = [...todos]
        newTodos.splice(index,1)
        setTodos(newTodos)
    }


    const getTodosHandler = ()=>(
        todos.map((todo,index)=>(
            <Task 
            key={`Task_${index}`} 
            todo={todo}
            editTodoHandler={(newTodo)=>editTodo(index,newTodo)}
            markTodoHandler={()=>markTodo(index)}
            deleteTodoHandler={()=>deleteTodo(index)}
            />
        ))
    )


  return (
    //ToDo App Card
    <div className={classes.container}>
        {/* Title Element */}
        <div className={classes.title}>
            <h1>To-do List App</h1>
        </div>
        {/* Create Task Form Element */}
        <div className={classes.add_task_container}>
            <form onSubmit={addTodo}>
                <input name='todo-task' ref={inputRef} type='text'  placeholder='Write your todo task'/>
                <button type='submit'>Create Task</button>
            </form>
        </div>
        {/* Task List Body Component */}
        <div className={classes.list_body}>
            {
                getTodosHandler()
            }
        </div>
    </div>
  )
}

export default TodoApp