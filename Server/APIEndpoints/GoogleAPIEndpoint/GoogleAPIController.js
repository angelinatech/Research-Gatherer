// *~*~*~*~*~*~ actual logic for route. ~*~*~*~*~*~*
const axios = require('axios');
const { v4: uuidv4 } = require('uuid')


// *~*~*~*~*~*~ logic for Google route. ~*~*~*~*~*~*

function getSearchResults(req, res) {
  const { searchQuery } = req;
  const cx = process.env.GOOGLE_CX;
  const apiKey = process.env.GOOGLE_API_KEY;
  // won't let you do more than 10 without pagination. Anneyeux.
  const num = '9'
  const googleApiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}&num=${num}`;

  axios.get(googleApiUrl)
    .then(response => {
      const data = response.data;
      
      if (!data.items || data.items.length === 0) {
        res.json({ searchResults: [] });
        return;
      }

      const searchResults = data.items.map(item => ({
        id: uuidv4(),
        title: item.title,
        url: item.link
      }));

      res.json({ searchResults });
    })
    .catch(error => {
      console.error(err);
      res.status(500).json({ error: `couldn't get google data` });
    });
}

module.exports = {
  getSearchResults,
};
