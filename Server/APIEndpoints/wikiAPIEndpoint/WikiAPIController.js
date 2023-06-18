const axios = require('axios');
const { v4: uuidv4 } = require('uuid')

// *~*~*~*~*~*~ logic for wikipedia route. ~*~*~*~*~*~*

function getSearchResults(req, res) {
  console.log('Received search request');
    const { searchQuery } = req;
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchQuery}&limit=12&format=json&origin=*`;
  
    axios.get(wikiUrl)
      .then(response => {
        console.log(response)
        const data = response.data;
        const titles = data[1];
        const urls = data[3];
        const searchResults = titles.map((title, i) => ({
          id: uuidv4(),
          title,
          url: urls[i]
        }));
        res.json({ searchResults });
      })
      .catch(error => {
        console.error(err, 'nope no data for youuu');
        res.status(500).json({ error: 'aint no data' });
      });
  };

module.exports = {
  getSearchResults,
};

  
  