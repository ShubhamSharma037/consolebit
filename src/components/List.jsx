import React from 'react'
import Task from './Task'
import classes from '../scss/TodoApp.module.scss'


const List = ({toDoList,setToDoList}) => {


    const taskHandler = (action,taskId,editedTask=null)=>{
        if(action === 'edit'){
            const newTodoList = [...toDoList]
            newTodoList.splice(taskId,1,{
                ...toDoList[taskId],
                task : editedTask
            })
            setToDoList([...newTodoList])
        }
        else if(action === 'completed'){
            const newTodoList = [...toDoList]
            newTodoList.splice(taskId,1,{
                ...toDoList[taskId],
                status : toDoList[taskId].status==='Completed'?'Not Started':'Completed'
            })
            console.log(newTodoList)
            setToDoList([...newTodoList])
        }
        else if(action === 'delete'){
            let newTodoList = [...toDoList]
            newTodoList.splice(taskId,1)

            //update id according to the new list
            newTodoList = newTodoList.map((task,id)=>({
                ...task,
                id : id
            }))
            setToDoList([...newTodoList])
        }
    }

    const getListHandler = ()=>(
        toDoList.map((todo)=>(
            <Task key={`Task_${todo.id}_${todo.task}`} task={todo} taskHandler={taskHandler}/>
        ))
    )

  return (
    <div className={classes.list_body}>
        {
            getListHandler()
        }
    </div>
  )
}

export default List