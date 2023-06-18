import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'
import Results from '../../Components/Results/Results';


// *~*~*~*~*~*~ Page for user collection to show ~*~*~*~*~*~*


function UserCollection() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const username = cookies.Username
  const [items, setItems] = useState([]);


 // *~*~*~*~*~*~ fetch users collection from database using email to identify it and token to auth with cookies ~*~*~*~*~*~*

  const getData = async () => {
    try {
      const token = authToken;
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/mycollection/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      setItems(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }
    , [])

  console.log(items)

 // *~*~*~*~*~*~ sort by date, latest first ~*~*~*~*~*~*

  const sortedItems = items.sort((a, b) => new Date(b.date) - new Date(a.date));

 // *~*~*~*~*~*~ If signed in show their stuff, if not empty with message ~*~*~*~*~*~*

  return (
    <div className="container">
      {!authToken &&
      <div className="emptyCollectionPage">
        <p>No collection here, did you make an account to store it under?</p>
      </div>}

      {authToken &&
        <>
          <h1 className="collectionH1">YOUR SAVED STUFFFFFFFFFF {username}</h1>

          <div className="itemGrid">
            <Results data={sortedItems} getData={getData} />
          </div>
        </>}
    </div>

  );
}

export default UserCollection;



