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
  return (
    <div>
        <h1>lifestory book shop</h1>
        <div className='books'>
            {books.map(book => (
                <div className='book' key={book.id}>
                    {book.cover && <img src={book.cover} alt='cover of book'/>}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.date}</span>
                </div>
            ))}
        </div>
        <button>
            <Link to='/add' className='text-3xl font-bold underline'>Add new book</Link>
        </button>
    </div>
  )
}

export default Books