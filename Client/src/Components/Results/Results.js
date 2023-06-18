import React, { useState, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import SkeletonBox from '../Skeleton Box/SkeletonBox'
import ResultBox from '../ResultBox/ResultBox'
import SaveButton from '../Buttons/SaveButton/SaveButton'
import DeleteButton from '../Buttons/DeleteButton/DeleteButton'
import EditButton from '../Buttons/EditButton/EditButton'




//  *~*~*~*~*~*~ search results passed in as data prop that page got from searchResults hook, getData passed in from collection page ~*~*~*~*~*~*

function Results({ data, getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const isLoggedIn = !!cookies.AuthToken;
  const [wikiBoxes, setWikiBoxes] = useState([]);
  const timeoutsRef = useRef({});
  const [showButtons, setShowButtons] = useState(false)
  const [collectionPage, setCollectionPage] = useState(false)
  const location = useLocation();
  const currentPage = location.pathname

// *~*~*~*~*~*~ check the page we're on and set whether it's collection page or not. Empty array so only runs once ~*~*~*~*~*~*

  const isCollection= () =>{
    if (currentPage === '/collection'){
      setCollectionPage(true)
    }
  }
  useEffect(() => {
    isCollection();
  }, []);



  // *~*~*~*~*~*~ takes the index of list item, click event for user clicking item, sets top buttons to showing ~*~*~*~*~*~*
  const handleResultClick = (index, event) => {
    event.preventDefault();
    setShowButtons(true)


    // *~*~*~*~*~*~ get the array of items/boxes and switch between loading/not loading and for this bit open boxes. use useRef hook to stop it opening when it's been closed post timeout. The loading eg skeleton box is set to timeout and become not loading after 5secs, then rerender with updated state as long as not closed. ~*~*~*~*~*~*
    setWikiBoxes((prevWikiBoxes) => {
      const updatedBoxes = [...prevWikiBoxes];
      updatedBoxes[index] = {
        loading: true,
        open: true
      };
      return updatedBoxes;
    });   
    clearTimeout(timeoutsRef.current[index]);
    timeoutsRef.current[index] = setTimeout(() => {
      setWikiBoxes((prevWikiBoxes) => {
        const updatedBoxes = [...prevWikiBoxes];
        updatedBoxes[index] = {
          loading: false,
          open: true
        };
        return updatedBoxes;
      });
    }, 2000);
  };

  // *~*~*~*~*~*~ to close box keep loading off, clear the timeout for that item, and set open to false and rerender to update box state, hide buttons ~*~*~*~*~*~*
  const handleWikiBoxClose = (index) => {
    clearTimeout(timeoutsRef.current[index]);
    setShowButtons(false)
    setWikiBoxes((prevWikiBoxes) => {
      const updatedBoxes = [...prevWikiBoxes];
      updatedBoxes[index] = {
        loading: false,
        open: false
      };
      return updatedBoxes;
    });
  };
  

  
// *~*~*~*~*~*~ when searchResults/data is passed/updated, wikiboxes set to no loading no open and an array the length of the results ~*~*~*~*~*~*
  useEffect(() => {
    setWikiBoxes(Array(data.length).fill({ loading: false, open: false }));
  }, [data]);




// *~*~*~*~*~*~ map searchResults/data checking each for loading/open info. Each becomes div named listItem, id is key. Each has a h4 title with url link if there. buttons render conditionally based on login/button show booleans and gets data passed. If open true ie clicked to open, depending on loading boolean, skeleton or wikiBox displays in list item div. Wiki box gets the url and id passed too. One last close button at bottom ~*~*~*~*~*~*

  return (
    <div className="list">
      {data.map((result) => {
        const { loading, open } = wikiBoxes[result.id] || { loading: false, open: false };
        return (
          <div key={result.id} className="listItems">
                    <div className="topBar">
                      {showButtons && isLoggedIn && <DeleteButton id={result.id} getData={getData}/>}
                      {showButtons && isLoggedIn && collectionPage && <EditButton id={result.id} result={result} getData={getData}/>}
                      {showButtons && isLoggedIn && !collectionPage && <SaveButton id={result.id} url={result.url} title={result.title}/>}
                      {showButtons && <button className="topCloseBtn"onClick={() => handleWikiBoxClose(result.id)}><i class="fa-solid fa-rectangle-xmark"></i></button>}
                    </div>
            <h4>
              {result.url ? (
                <a href={result.url} onClick={(e) => handleResultClick(result.id, e)}>
                  {result.title}
                </a>
              ) : (
                result.title
              )}
            </h4>

            
            {open && (
              <div className="returnBox">

                {loading ? (
                  <div className="skeletonContainer">
                    <SkeletonBox />
                  </div>
                ) : (
                  <div className="wikiContainer">
                    <ResultBox url={result.url} id={result.id} />
                  </div>
                )}<button className="bottomCloseBtn"onClick={() => handleWikiBoxClose(result.id)}>Close</button>
              </div>
            )} 
          </div>
        );
      })}
    </div>
  );
}

export default Results;
