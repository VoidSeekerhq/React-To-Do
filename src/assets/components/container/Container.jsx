import React, { useState, useEffect } from 'react'
import './Container.css'

const Container = () => {

    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState("")
    const [todo, setTodo] = useState("")
    const [filter, setFilter] = useState("all")

    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem("todos")
        return storedTodos ? JSON.parse(storedTodos) : []
    })

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    const handleAdd = () => {
        if (todo === "") return alert("task cannot be empty");

        setTodos([...todos, { id: Date.now(), title: todo, isComplete: false }])
        setTodo("")
    }

    const handleCheck = (id) => {
        setTodos(
            todos.map(item =>
                item.id === id
                    ? { ...item, isComplete: !item.isComplete }
                    : item
            )
        )
    }

    const handleEdit = (id, currentTitle) => {
        setEditingId(id)
        setEditText(currentTitle)
    }

    const handleSave = (id) => {
        setTodos(
            todos.map(item =>
                item.id === id
                    ? { ...item, title: editText }
                    : item
            )
        )

        setEditingId(null)
        setEditText("")
    }

    const handleDelete = (id) => {
        setTodos(todos.filter(item => item.id !== id))
    }

    const filteredTodos = todos.filter(item => {
        if (filter === "complete") {
            return item.isComplete
        }

        if (filter === "uncomplete") {
            return !item.isComplete
        }

        return true
    })

    return (
        <div className='container'>
            <div className="header">
                <h1>To-Do List</h1>
                <div className="add-container">
                    <input type="text" className="task-input" placeholder='Add your task here' onChange={handleChange} value={todo} />
                    <button className="add" onClick={handleAdd}>Add</button>
                </div>
            </div>
            <ul className="filter">
                <li
                    className={filter === "all" ? "selected" : ""}
                    onClick={() => setFilter("all")}
                >
                    All
                </li>

                <li
                    className={filter === "complete" ? "selected" : ""}
                    onClick={() => setFilter("complete")}
                >
                    Complete
                </li>

                <li
                    className={filter === "uncomplete" ? "selected" : ""}
                    onClick={() => setFilter("uncomplete")}
                >
                    Uncomplete
                </li>
            </ul>
            <div className="todos">
                {filteredTodos.map(item => {
                    return <div className="todo" key={item.id}>
                        {editingId === item.id ? (
                            <input
                                type="text"
                                className='edit-input'
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                        ) : (
                            <>
                                <input type="checkbox" className='checkbox' checked={item.isComplete} onChange={() => handleCheck(item.id)} />
                                <p className="title" style={{ textDecoration: item.isComplete ? "line-through" : "none" }}>{item.title}</p>
                            </>
                        )}
                        <div className="buttons">
                            {editingId === item.id ? (
                                <svg viewBox="0 0 24 24" onClick={() => handleSave(item.id)} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="var(--text-color)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" onClick={() => handleEdit(item.id, item.title)} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="var(--text-color)"></path> </g></svg>
                            )}

                            <svg width="28px" height="28px" onClick={() => handleDelete(item.id)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="var(--text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Container
