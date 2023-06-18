import { useState, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import './Modal.css'



// *~*~*~*~*~*~ got the route and logged in status passed from navbar buttons, set the inputs to empty strings etc ~*~*~*~*~*~*

function Modal({ onClick, isLogIn }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const modalRef = useRef(null);



  // *~*~*~*~*~*~ reference the modal box and make so any click that isn't inside it close the modal ~*~*~*~*~*~*

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClick]);



  // *~*~*~*~*~*~ based on what is passed from navbar or buttons, submit to the correct endpoint in backend ~*~*~*~*~*~*

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    console.log("endpoint is", endpoint)



    // *~*~*~*~*~*~ show errors for non matching passwords or blank email/password entries~*~*~*~*~*~*

    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!')
      return
    }
    if (email === '' || password === '') {
      setError('You gotta fill out the form!')
      return
    }


    // *~*~*~*~*~*~ POST req using endpoint var, send the signup data get response object from server ~*~*~*~*~*~*

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      setError('An error occurred. Please try again.');
      return;
    }

    // *~*~*~*~*~*~ getting data back set cookies, and empty the input fields then reload window for changes to take effect, otherwise err ~*~*~*~*~*~*
    try {
      const data = await response.json();
      if (data.detail) {
        setError(data.detail);
      } else {
        setCookie('Username', data.username);
        setCookie('Email', data.email);
        setCookie('AuthToken', data.token);
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('');
        window.location.reload();
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };



  // *~*~*~*~*~*~ conditionally render input forms based on isLogin status, conditionally send info to endpoint too with btn ~*~*~*~*~*~*

  return (
    <div className={isLogIn ? "loginModal" : "signupModal"} ref={modalRef}>
      <button className="closeBtn" onClick={onClick}><i class="fa-solid fa-rectangle-xmark"></i></button>
      <form onSubmit={handleSubmit}>

        <h2>{isLogIn ? 'Log in here!' : 'Create an Account!'}</h2>

        {!isLogIn && (<div className="usernameBox">
          <h3><i class="fa-solid fa-user-secret"></i> </h3>
          <input
            className="username"
            type="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          /></div>
        )}
        <div className="emailBox">
          <h3><i class="fa-solid fa-envelope"></i></h3>
          <input
            className="email"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          /></div>
        <div className="passwordBox">
          <h3><i class="fa-solid fa-key"></i></h3>
          <input
            className="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          /></div>
        {!isLogIn && (
          <div className="passwordBox">
            <h3><i class="fa-solid fa-key"></i></h3>
            <input
              className="password"
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            /></div>
        )}
        <button className="submitFormBtn" type="submit" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}><i class="fa-solid fa-id-card"></i>{isLogIn ? ' Login' : ' Register'}</button>

        {error && <p className="errorMsg">{error}</p>}
      </form>
    </div>



  )
}


export default Modal