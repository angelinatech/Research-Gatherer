import { useState } from 'react';
import { useLocation } from 'react-router-dom';


//  *~*~*~*~*~*~ custom hook for api call, set boolean data needed for page, useLocation for which api route to go down. wiki is / . ~*~*~*~*~*~*
function useSearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoResults, setIsNoResults] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname === '/' ? '/wiki' : location.pathname;




//  *~*~*~*~*~*~ query from search comp and route sent by page location used to fetch, set error booleans, update results then reset booleans after ~*~*~*~*~*~*

const search = (sanitisedQuery) => {
  setIsLoading(true);

  fetch(`${currentPage}?searchQuery=${sanitisedQuery}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Couldn't get the search results, sorry!`);
      }
      return response.json();
    })
    .then(data => {
      setSearchResults(data.searchResults);
      setIsNoResults(data.searchResults.length === 0);
    })
    .catch(error => {
      console.error(`Couldn't fetch results:`, error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};



// *~*~*~*~*~*~ pass these as object to page so can destructure and use ~*~*~*~*~*~*

return { searchResults, isLoading, isNoResults, search };

}

export default useSearchResults;
