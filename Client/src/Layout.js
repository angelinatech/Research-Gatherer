import React from 'react';
import Navbar from './Components/Navbar/Navbar';


// *~*~*~*~*~*~ general layout, navbar, search bit, footer. Simple simple ~*~*~*~*~*~*


const Layout = ({ children }) => {
  return (
    <div className="App">

      <header><Navbar /></header>
      
      {children}
      
      <footer><p className="copyright">© Angelina Tech</p></footer>
    
    </div>
  );
};

export default Layout;