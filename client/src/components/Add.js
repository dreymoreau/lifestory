import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const [book, setBook] = useState ({
    title:"",
    desc:"",
    cover: "",
    date: ""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
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
    <div>
      <div className='form'>
       <h1>Add new Book</h1>
        <input type='text' placeholder='title' onChange={handleChange} name='title'/>
        <input type='text' placeholder='desc' onChange={handleChange} name='desc'/>
        <input type='text' placeholder='cover' onChange={handleChange} name='cover'/>
        <input type='date' placeholder='date' onChange={handleChange} name='date'/>
      </div>

      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add