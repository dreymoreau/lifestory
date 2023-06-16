import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

  // default state before inputted info
  const [book, setBook] = useState ({
    title: "",
    desc: "",
    cover: "",
    date: ""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    // to set the key values for book object
    setBook((prev) => ({...prev, [e.target.name]: e.target.value}))
  };

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8880/books', book)
      navigate('/')  
    } catch (err) {
      console.error(err)
    }
  }

  console.log(book)
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-800 to-blue-600 p-4 text-black">
      <div className='form'>
       <h1 className='flex justify-center align-center'>Add new Book</h1>
        <input type='text' placeholder='title' onChange={handleChange} name='title'className='form flex p-4 justify-center align-center mx-auto my-10 '/>
        <input type='text' placeholder='author' onChange={handleChange} name='desc'className='form flex p-4 justify-center align-center mx-auto my-10'/>
        <input type='file' placeholder='cover' onChange={handleChange} name='cover' className='form flex p-4 justify-center align-center mx-auto my-10'/>
        <input type='date' placeholder='date' onChange={handleChange} name='date' className='form flex p-4 justify-center align-center mx-auto my-10'/>
      </div>

      <button onClick={handleClick}>Add</button>

      <a href="/" target="_blank" rel="noopener noreferrer" className='flex justify-center align-center'>Home</a>
    </div>
  )
}

export default Add