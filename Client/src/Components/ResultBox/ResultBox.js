import React from 'react';

// *~*~*~*~*~*~ grab the url and id(key) from results component, iframe is website embed ~*~*~*~*~*~*

function ResultBox({ url, id }) {

  return (
    <div id={`wikiBox-${id}`}>
      <iframe src={url} className="wikiFrame" title="Wikipedia Page"></iframe>
    </div>
  );
}


export default ResultBox;
