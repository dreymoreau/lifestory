import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Upload from './Upload'
// const [uploadStatus, setUploadStatus] = useState('');


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

  // const getImage = () => {
  // const [image, setImage] = useState();
  // useEffect(() => {
  //   fetch(`http://localhost:8880/api/image`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json, charset=UTF-8',
  //       'Accept': 'application/json, text/html'
  //     }, 
  //     credentials: 'include'
  //   })
  //   .then(data => data.json())
  //   .then((data) => {
  //     console.log(data)
  //     setImage('http://localhost:8880' + data.image)
  //     console.log(image)
  //   })
  // })
  // }


  // const imageHandler = (event) => {
  //   const file = event.target.files[0]
  //   const formData = new FormData()
  //   formData.append('image', file)

  //   fetch(`http://localhost://8880/api/image`,{
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       'Accept': 'multipart/form-data'
  //     },
  //     credentials: 'include'
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //     setUploadStatus(res.msg)
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })
  // }

  console.log(book)
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-800 to-blue-600 p-4 text-black">
      <div className='form'>
       <h1 className='flex justify-center align-center'>Add new Book</h1>
        <input type='text' placeholder='title' onChange={handleChange} name='title'className='form flex p-4 justify-center align-center mx-auto my-10 '/>
        <input type='text' placeholder='author' onChange={handleChange} name='desc'className='form flex p-4 justify-center align-center mx-auto my-10'/>
        {/* <h2> {uploadStatus} </h2> */}
        <input type='file' placeholder='cover' accept='image/*' multiple={false} name='cover' className='form flex p-4 justify-center align-center mx-auto my-10'/><img src={Upload} alt="img"/>
        <input type='date' placeholder='date' onChange={handleChange} name='date' className='form flex p-4 justify-center align-center mx-auto my-10'/>
      </div>

      <button onClick={handleClick}>Add</button>

      <a href="/" target="_blank" rel="noopener noreferrer" className='flex justify-center align-center'>Home</a>
    </div>
  )
}

export default Add