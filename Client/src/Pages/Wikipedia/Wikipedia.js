import React from 'react';
import Search from '../../Components/Search/Search';
import useSearchResults from '../../Hooks/useSearchResults';
import Results from '../../Components/Results/Results';


function Wikipedia() {

  // *~*~*~*~*~*~ use hook to pass search function to search component and append query to fetch, get data to show, get booleans for err msgs, establish page for req ~*~*~*~*~*~*  
  const { searchResults, isLoading, isNoResults, search } = useSearchResults();
  const currentPage = "Wikipedia"

  const renderMessage = () => {
    if (isLoading) {
      return <p className="errorMessage loadingMessage">Loading...</p>;
    }

    if (isNoResults) {
      return <p className="errorMessage">No results found, sorry!</p>;
    }

    return null;
  };

  // *~*~*~*~*~*~ return app container with bits an bobs, search box passing fetch stuff needed, show message if true, if not results. ~*~*~*~*~*~*
  return (

    <div className="container">
      <header className="header">
        <div className="logoPic"></div>
        <h1>WikiSearch</h1></header>
      <Search onSearch={search} currentPage={currentPage} />

      {renderMessage()}

      {!isLoading && !isNoResults && <Results data={searchResults}/>}
    </div>
  );
}

export default Wikipedia;



