import Buttons from "../Buttons/Buttons";
import {useEffect, useState} from "react";
import "./Todo.css"
import {getTodo, setTodo, deleteTodo} from "../../Service/Firebase/firestore";
import {TodoContext} from "../../Service/Firebase/firestore";

const Todo = () => {

    const [input, setInput] = useState("")
    const [task, setTask] = useState()


    const onChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const onButtonClick = (e) => {
        e.preventDefault()
        setTask(input)
        setTodo("Todolar", input)
        getTodo()
    }

    const deleteTodos = (e)=>{
        deleteTodo(e)

    }

    return (
        <TodoContext.Consumer>

            {value => {
                console.log("value==>>",value.length)

                return (
                    <div className="container Margin-auto"
                    >
                        <p className="Text-center " style={{color:"white",fontWeight:"700"}}>Todo App</p>
                        <div className="row Header">
                            <input
                                placeholder="Bir şeyler yazmayı deneyin"
                                style={{marginRight: "20px"}}
                                onChange={onChange}

                            />

                            <Buttons
                                onClick={onButtonClick}
                            > Kaydet </Buttons>


                        </div>

                        <div className="Content ">

                            <div className="List-items ">





 
                                {
                                    value.length>0?

                                    value.map((note)=>{

                                        
                                        return(
                                            <div className="Item  ">

                                                <label htmlFor="flexCheckChecked">
                                                    {note[0]}
                                                </label>

                                                <button
                                                onClick={(e)=>deleteTodos(note[0])}

                                                className="delete">delete</button>
                                            </div>
                                        )
                                    })
                                    :
                                    
                                        <div className="fakeItem  ">

                                        <label htmlFor="flexCheckChecked">
                                            
                                        </label>

                                        <button

                                        className="delete">delete</button>
                                    </div>
                                    

                                }



                            </div>
                        </div>
                    </div>

                )

            }}

        </TodoContext.Consumer>
    )
}
export default Todo