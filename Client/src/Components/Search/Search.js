import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import '../Buttons/Buttons.css'




// *~*~*~*~*~*~ search function eg api call passed via app from hook as prop ~*~*~*~*~*~*
function Search({ onSearch, currentPage  }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputError, setInputError] = useState(false);


  // *~*~*~*~*~*~ get the search query from input ~*~*~*~*~*~*
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setInputError(false);
  };


  // *~*~*~*~*~*~ uses sanitiser API to make sure it's clean nothing weird entered, trim whitespace, set err if no search term, otherwise then pass on to onSearch func ~*~*~*~*~*~*
  const handleSearch = () => {
    const sanitisedQuery = DOMPurify.sanitize(searchTerm.trim());
    if (sanitisedQuery === '') {
      setInputError(true);
    } else {
      onSearch(sanitisedQuery, currentPage);
      setSearchTerm('')
    }
  };


 // *~*~*~*~*~*~ so pressing enter counts as click ~*~*~*~*~*~*
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };



  // *~*~*~*~*~*~ render search box, show error message if one is set, button to handle search, name passed from page we're on ~*~*~*~*~*~*
  return (
    <div className='searchBox'>
      <div>
        <input
          onKeyDown={handleKeyPress}
          placeholder={"Search " + currentPage + " - Knowledge"}
          className={inputError ? 'invalid-input' : ''}
          id="searchwikipedia"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {inputError && <div className="errorMsg">Please enter valid search term.</div>}
      </div>

      <button className="searchBtn" onClick={handleSearch}><i class="fa-brands fa-searchengin"></i>Search {currentPage} </button>
    </div>
  );
}

export default Search;



