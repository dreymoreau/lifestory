import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect (() => {
        // async is important for fetching api data
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get('http://localhost:8880/books')
                setBooks(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8880/books/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
  return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-red-800 to-amber-600 p-4 text-white">
        <h1 className='flex p-4 justify-center max-w-screen-lg mx-auto h-full'>lifestory book shop</h1>
        <div className='books w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0'>
            {books.map(book => (
                <div className='book' key={book.id}>
                    {book.cover && <img src={book.cover} alt='cover of book'/>}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.date}</span>
                    <button className='delete block mx-auto' onClick={() => handleDelete(book.id)}>Delete</button>
                    <button className='update block mx-auto'>Update</button>
                </div>
            ))}
        </div>
        <button className='flex p-4 justify-center items-center max-w-screen-lg mx-auto h-full'>
            <Link to='/add' className='text-3xl font-bold underline'>Add new book</Link>
        </button>
        </div>
  )
}

export default Books