const axios = require('axios');
const { v4: uuidv4 } = require('uuid')

// *~*~*~*~*~*~ logic for PubMed route. Had to feed search into other for titles/urls~*~*~*~*~*~*

function getSearchResults(req, res) {
  const { searchQuery } = req;
  const pubMedSearchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${searchQuery}&retmode=json&retmax=12`;

  axios.get(pubMedSearchUrl)
    .then(response => {
      const data = response.data;
      if (!data.esearchresult || !data.esearchresult.idlist) {
        res.json({ searchResults: [] });
        return;
      }

      const articleIds = data.esearchresult.idlist;
      const pubMedSummaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${articleIds.join(',')}&retmode=json`;

      axios.get(pubMedSummaryUrl)
        .then(response => {
          const data = response.data;
          const articles = data.result;

          const searchResults = articleIds.map(id => {
            const article = articles[id];
            const title = article && article.title ? article.title : 'Untitled';
            const url = `https://pubmed.ncbi.nlm.nih.gov/${id}`;
            
            return {
              id: uuidv4(),
              title,
              url
            };
          });

          res.json({ searchResults });
        })
        .catch(error => {
          console.error(err);
          res.status(500).json({ error: `couldn't get data` });
        });
    })
    .catch(error => {
      console.error(error, 'error getting PubMed data:');
      res.status(500).json({ error: 'failed getting data' });
    });
}

module.exports = {
  getSearchResults,
};

