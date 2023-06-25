import React, { useState } from 'react'

const uploadPhoto = () => {
    let [uploadStatus, setUploadStatus] = useState(uploadStatus)
}


const getImage = () => {
    const [image, setImage] = useState('');
    useEffect(() => {
      fetch(`http://localhost:8880/api/image`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json, charset=UTF-8',
          'Accept': 'application/json, text/html'
        }, 
        credentials: 'include'
      })
      .then(data => data.json())
      .then((data) => {
        console.log(data)
        setImage('http://localhost:8880' + data.image)
        console.log(image)
      })
    })
    }

    const imageHandler = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
    
        fetch(`http://localhost://8880/api/image`,{
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'multipart/form-data'
          },
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          setUploadStatus(res.msg)
        })
        .catch(error => {
          console.error(error)
        })
      }