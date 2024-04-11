import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function App() {

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleAdd = () => {
    if (todo.length !== 0) {
      console.log(todo.length)
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      setTodo("")
      saveToLocalStorage()
    }
  }

  const handleEdit = (e, id) => {
    let editableTodo = todos.filter(i => i.id === id)
    setTodo(editableTodo[0].todo)
    setTodos(todos.filter(item => item.id !== id));
    saveToLocalStorage()
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name

    let index = todos.findIndex((item) => {
      return item.id === id
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  return (
    <>
      <Navbar />
      <div className="container bg-violet-100 mx-auto my-20 rounded-xl p-5 w-fit min-h-[80vh]">
        <div className="addTodo my-4">
          <h2 className='text-lg font-semibold'>Add To Do</h2>

          <input onChange={handleChange} value={todo} type="text" className='min:w-56 md:w-80 rounded-md' />

          <button onClick={handleAdd} className='bg-blue-900 hover:bg-emerald-600 text-white px-2 py-[2px] mx-4 tex-sm font-semibold rounded-md'>Save</button>
        </div>

        <div className="flex gap-2 -mt-2 mb-4">
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} />
          <div className='text-sm opacity-60'>Show Completed Tasks</div>
        </div>
        <h2 className='font-semibold text-lg'>To Do Tasks</h2>

        <div className="todos">
          {todos.length === 0 && <div className='opacity-50 my-2'>No Pending Tasks.</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-4">
              <div className='flex gap-5'>
                <input onChange={handleCheckBox} type="checkbox" name={item.id} checked={item.isCompleted} />

                <div className={`${item.isCompleted ? "line-through" : ""} mt-[1px] w-[200px]`} style={{ wordWrap: 'break-word' }}>{item.todo}</div>
              </div>
              <div className="btns flex items-center justify-center mr-4">
                <button onClick={(e) => handleEdit(e, item.id)} className=' text-blue-900 hover:text-lime-700 mx-1 text-lg'><FaEdit /></button>
                <button onClick={() => handleDelete(item.id)} className='text-blue-900 hover:text-red-600 mx-1 text-lg'><RiDeleteBin5Fill /></button>

              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
