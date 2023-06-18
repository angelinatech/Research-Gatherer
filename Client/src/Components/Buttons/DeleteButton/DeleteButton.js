import React, { useState} from 'react';
import { useCookies } from 'react-cookie';
import './DeleteButton.css'


// *~*~*~*~*~*~ id and function passed, get auth token cookie ~*~*~*~*~*~*

function DeleteButton({ id, getData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken


// *~*~*~*~*~*~ data to send ~*~*~*~*~*~*

  const data = {
    id:id,
    authToken: authToken,
  };


// *~*~*~*~*~*~ open/close modal functions ~*~*~*~*~*~*

  const showModal = () => {
    setModalOpen(true)
}

  const closeModal = () => {
    setModalOpen(false);
  };


// *~*~*~*~*~*~ send a delete request using the id as the identifier and token for auth. then if delete successful call getData again to reload with new list, close modal, err msgs ~*~*~*~*~*~*

  const deleteData = async () => {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/myCollection/${data.id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`},
        body: JSON.stringify(data)
      });

      if (response.ok) {
        getData();
        setModalOpen(false)
        return
      } else {
        if (response.status === 404) {
          console.error("Sorry, we couldn't find that item");
        } else if (response.status === 401) {
          console.error("Unauthorised access");
        } else {
          console.error("Sorry, an error has occurred, please try again.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };



  // *~*~*~*~*~*~ delete button triggers modal to double check if delete wanted then either exit or delete buttons ~*~*~*~*~*~*
  
  return (
    <div>
      <button className="deleteBtn" onClick={showModal}><i class="fa-solid fa-trash"></i></button>

      {modalOpen && (
        <div className="youSureHunModal">
          <h2>Sure? You'll have to find it again to get it back...</h2>
          <button className="nvmExitBtn" onClick={closeModal}><i class="fa-solid fa-square-xmark"></i>Ok nvm</button>
          <button className="yupExitBtn" onClick={deleteData}><i class="fa-solid fa-square-check"></i>I said what i said</button>
        </div>
      )}
    </div>
  );
}

export default DeleteButton;
