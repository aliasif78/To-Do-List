import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-blue-950 text-white justify-between py-2 fixed top-0 left-0 w-full'>
        <div className="logo">
            <span className='font-bold text-md lg:text-xl mx-8 cursor-pointer'>To Do List</span>
        </div>

        <ul className="flex gap-5 lg:gap-10 mx-5 lg:mx-10">
            <li className='cursor-pointer hover:font-bold transition-all duration-150'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-150'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
