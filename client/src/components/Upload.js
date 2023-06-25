import React, { useState, useEffect } from 'react'
import axios from 'axios'

function FileUpload(){
  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    axios.get('https://localhost://8880')
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }, [])
  const handleUpload = () => {
    const formData = new FormData()
    formData.append('image', file)
    axios.post("http://localhost://3000/upload", formData)
    .then(res => {
      if(res.data.Status === "Success"){
        console.log("Succeeded")
       } else {
        console.log('Failed')
       }
      })
    .catch(err => console.log(err))
  }
  return (
    <div className='container'>
      <input type='file' onChange={handleFile} />
      <button onClick={handleUpload}>Upload Cover Photo</button>
    </div>
  )
}

export default FileUpload
// const uploadPhoto = () => {
//     let [uploadStatus, setUploadStatus] = useState(uploadStatus)
// }


// const getImage = () => {
//     const [image, setImage] = useState('');
//     useEffect(() => {
//       fetch(`http://localhost:8880/api/image`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json, charset=UTF-8',
//           'Accept': 'application/json, text/html'
//         }, 
//         credentials: 'include'
//       })
//       .then(data => data.json())
//       .then((data) => {
//         console.log(data)
//         setImage('http://localhost:8880' + data.image)
//         console.log(image)
//       })
//     })
//     }

//     const imageHandler = (event) => {
//         const file = event.target.files[0]
//         const formData = new FormData()
//         formData.append('image', file)
    
//         fetch(`http://localhost://8880/api/image`,{
//           method: "POST",
//           body: formData,
//           headers: {
//             'Accept': 'multipart/form-data'
//           },
//           credentials: 'include'
//         })
//         .then(res => res.json())
//         .then(res => {
//           setUploadStatus(res.msg)
//         })
//         .catch(error => {
//           console.error(error)
//         })
//       }