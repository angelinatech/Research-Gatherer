import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { MenuData } from './MenuData'
import jwt_decode from 'jwt-decode';
import Modal from '../Modal/Modal'
import booksImage from '../../Assets/Images/booksImage.png'
import './Navbar.css'
import '@fortawesome/fontawesome-free/css/all.css';


// *~*~*~*~*~*~ Navbar using the Menu data to render it's bits 'n' bobs ~*~*~*~*~*~*

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const isLoggedIn = !!cookies.AuthToken;
  const [modalAction, setModalAction] = useState('');


  // *~*~*~*~*~*~ button click functions to control modal showing and send inputted data down the right route (signup/login) or sign out snatch cookies and boot~*~*~*~*~*~*

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleSignUp = () => {
    setModalAction('signup');
    setShowModal(true);
  };

  const handleLogin = () => {
    setModalAction('login');
    setShowModal(true);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    console.log('signout');
    removeCookie('Email');
    removeCookie('AuthToken');
    removeCookie('Username');
    window.location.reload();
  };


// *~*~*~*~*~*~ check for expired token (it's set to 12hrs) if expired (compare expired time to current time) snatch cookies, log user out (60,000 is a minute so checks every min) ~*~*~*~*~*~*

  const handleAutoSignOut = () =>{
    removeCookie('Email');
    removeCookie('AuthToken');
    removeCookie('Username');
    window.location.reload();
  }

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = cookies.AuthToken;
      if (token) {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {

          handleAutoSignOut();
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000);

// *~*~*~*~*~*~ cleanup function, don't want it to run if no auth token or unmounted ~*~*~*~*~*~*
    return () => {
      clearInterval(interval);
    };
  }, [cookies.AuthToken]);






// *~*~*~*~*~*~ conditional rendering for daysss ~*~*~*~*~*~*

// *~*~*~*~*~*~ basically the clickable links/buttons are passed in and mapped over. 5 diff rendering options for the four login/logout/signup/collection buttons and then the other four normal navlinks. Then either login/signup or collection/logout pair of buttons show based on isLoggedIn. The mobile dropdown link conditionally renders diff icon if clicked, navmenu diff classnames based on click (css for reveal), and modal gets passed the onClick and isLoggedIn action to send data down ~*~*~*~*~*~*

  return (
    <nav className="navbarItems">

      <div className="navLogo">
        <img src={booksImage} alt="Logo" />
        <h3>MultiSearch</h3>
      </div>

      <div className="menuIcons" onClick={handleClick}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>

      <ul className={clicked ? 'navMenu active' : 'navMenu'}>

        {MenuData.map((item, index) => (
          <li key={index}>
            {item.title === 'Sign Up' && !isLoggedIn && (
              <a href={item.url} className={item.className} onClick={handleSignUp}>
                <i className={item.icon}></i>
                {item.title}
              </a>
            )}
            {item.title === 'Login' && !isLoggedIn && (
              <a href={item.url} className={item.className} onClick={handleLogin}>
                <i className={item.icon}></i>
                {item.title}
              </a>
            )}
            {item.title === 'Your Collection' && isLoggedIn && (
              <a href={item.url} className={item.className}>
                <i className={item.icon}></i>
                {item.title}
              </a>

            )}
            {item.title === 'Sign Out' && isLoggedIn && (
              <a href={item.url} className={item.className} onClick={handleSignOut}>
                <i className={item.icon}></i>
                {item.title}
              </a>
            )}
            {item.title !== 'Sign Up' && item.title !== 'Login' && item.title !== 'Your Collection' && item.title !== 'Sign Out' && (
              <a href={item.url} className={item.className}>
                <i className={item.icon}></i>
                {item.title}
              </a>
            )}
          </li>
        ))}
      </ul>

      {showModal && (
        <Modal
          onClick={() => setShowModal(false)}
          isLogIn={modalAction === 'login'}
        />
      )}
    </nav>
  );
}

export default Navbar;


