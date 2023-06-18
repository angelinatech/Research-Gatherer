import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './SaveButton.css'

// *~*~*~*~*~*~ info from result component, details based on cookies, check for login so button doesn't render on collection pg ~*~*~*~*~*~*

function SaveButton({ id, url, title }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const username = cookies.Username




// *~*~*~*~*~*~ the data to be saved to the database ~*~*~*~*~*~*

  const data = {
    id:id,
    title: title,
    url: url,
    date: new Date(),
    username: username,
    user_email: userEmail,
    authToken: authToken,
    category: "random"
  };


  // *~*~*~*~*~*~ POST req to mycollection route with the data, if it's successful show message saying all good otherwise err ~*~*~*~*~*~*

  const postData = async () => {

    try {
      const response = await fetch(`/mycollection`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`},
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setModalOpen(true);
      } else {
        console.error("Sorry, an error has occurred, please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  // *~*~*~*~*~*~ just to close modal ~*~*~*~*~*~*
  
  const closeModal = () => {
    setModalOpen(false);
  };

// *~*~*~*~*~*~ render button, when clicked data posts then modal shows to confirm plus link to collection pg ~*~*~*~*~*~*

  return (
    <div>
       <button className="saveBtn" onClick={postData}><i class="fa-solid fa-floppy-disk"></i></button>

      {modalOpen && (
        <div className="beenSavedModal">
          <h2>Saved to your collection</h2>
          <button className="saveModalExitBtn" onClick={closeModal}><i class="fa-solid fa-rectangle-xmark"></i></button>
          <a href="/collection">View your saved collection!</a>
        </div>
      )}
    </div>
  );
}

export default SaveButton;


