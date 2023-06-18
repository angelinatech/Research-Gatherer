import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './EditButton.css'



function EditButton({ id, result, getData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const username = cookies.Username

  // *~*~*~*~*~*~ open/close modal functions ~*~*~*~*~*~*

  const showModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false);
  };


  // *~*~*~*~*~*~ data to update and send ~*~*~*~*~*~*

  const [data, setData] = useState({
    id: id,
    user_email: userEmail,
    title: result.title,
    url: result.url,
    date: new Date(),
    username: username,
    authToken: authToken,
    category: "random"
  })

  // *~*~*~*~*~*~ PUT req eg edit, + error handling, if good hide modal, run getData to update ~*~*~*~*~*~*

  const editData = async (e) => {
    e.preventDefault()
    console.log(data)
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/myCollection/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`},
        body: JSON.stringify(data)
      })
      if (response.ok) {
        getData()
        setModalOpen(false)
      }
      else {
        if (response.status === 404) {
          console.error("Sorry, we couldn't find that item");
        } else if (response.status === 401) {
          console.error("Unauthorised access");
        } else {
          console.error("Sorry, an error has occurred, please try again.");
        }
      }
    } catch (err) {
      console.error(err)
    }
  }


  // *~*~*~*~*~*~ whatever event object, update data with input value ~*~*~*~*~*~*

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };



  // *~*~*~*~*~*~ edit button triggers modal to edit item then either exit or delete buttons ~*~*~*~*~*~*

  return (
    <div className="">
       <button className="editBtn" onClick={showModal}><i class="fa-solid fa-pen-to-square"></i></button>

      {modalOpen && (
        <div className="editModal">
          <h2>What would you like to label this article?</h2>
          <input
            required
            maxLength={30}
            placeholder=" New title goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="titleInput"
          />


          <button className="cancelEditBtn" onClick={closeModal}><i class="fa-solid fa-square-xmark"></i>Cancel</button>
          <button className="confirmEditBtn" onClick={editData}><i class="fa-solid fa-square-check"></i>Update</button>
        </div>
      )}
    </div>


  )

}

export default EditButton














// *~*~*~*~*~*~ data to send ~*~*~*~*~*~*