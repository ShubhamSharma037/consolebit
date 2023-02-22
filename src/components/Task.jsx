import React, { useEffect, useRef, useState } from 'react'
import classes from '../scss/TodoApp.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'


const Task = ({todo,markTodoHandler,deleteTodoHandler, editTodoHandler}) => {

    const [isEdit,setEdit] = useState(false)
    const editRef = useRef()

    useEffect(()=>{
        //focus on input box and set the cursor to end of the value
        if(isEdit){
            editRef.current.value = todo.task
            editRef.current.focus()
            editRef.current.selectionStart = editRef.current.value.length;
            editRef.current.selectionEnd = editRef.current.value.length;
        }
    },[isEdit])

  return (
    <div className={classes.task_container}>
        {/* //if task created is done, strike-through the task and show delete button */}
        {
            todo.isDone?(
                <>
                    <div className={classes.col1}>
                        <input checked={todo.isDone} type='checkbox' onChange={markTodoHandler}/>
                        <strike className={classes.strike}>
                            <h3 className={classes.task_completed_text}>&nbsp;&nbsp;{todo.task}&nbsp;&nbsp;</h3>
                        </strike>
                    </div>
                    <div className={classes.col2}>
                        <button onClick={deleteTodoHandler}>
                            <FontAwesomeIcon size='lg' icon={faTrash}/>
                        </button>
                    </div>
                </>
            ):(
                // if task edited, let update the task and confirm or discard changes 
                isEdit?(
                    <>
                        <div className={classes.col1}>
                            <input ref={editRef} type='text'/>
                            <button onClick={()=>{
                                editTodoHandler(editRef.current.value);
                                setEdit(false)
                            }}>
                                <FontAwesomeIcon size='lg' icon={faCheck}/>
                            </button>
                            <button onClick={()=>setEdit(false)}>
                                <FontAwesomeIcon size='lg' icon={faClose}/>
                            </button>
                        </div>
                    </>
                ):
                // if edit is false 
                (
                    <>
                        <div className={classes.col1}>
                            <input type='checkbox' onChange={markTodoHandler}/>
                            <h3>{todo.task}</h3>
                        </div>
                        <div className={classes.col2}>
                            <button onClick={()=>setEdit(true)}>
                                <FontAwesomeIcon size='lg' icon={faEdit}/>
                            </button>
                            <button onClick={deleteTodoHandler}>
                                <FontAwesomeIcon size='lg' icon={faTrash}/>
                            </button>
                        </div>
                    </>
                )
            )
        }
    </div>
  )
}

export default Task