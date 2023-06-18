const axios = require('axios');
const { v4: uuidv4 } = require('uuid')


// *~*~*~*~*~*~ logic for News API route. ~*~*~*~*~*~*

function getSearchResults(req, res) {
  console.log('Received search request');
  const { searchQuery } = req;
  const apiKey = process.env.NEWS_API_KEY
  const eventRegistryUrl = 'http://eventregistry.org/api/v1/article/getArticles';

  const requestBody = {
    action: 'getArticles',
    keyword: searchQuery,
    articlesPage: 1,
    articlesCount: 12,
    articlesSortBy: 'rel',
    articlesSortByAsc: false,
    // full unless change integer 
    articlesArticleBodyLen: -1,
    resultType: 'articles',
    lang: 'eng',
    dataType: ['news', 'pr'],
    apiKey: apiKey,
    // last 31 days 
    forceMaxDataTimeWindow: 31
  };

  axios
    .post(eventRegistryUrl, requestBody)
    .then(response => {
      const data = response.data;

      if (!data.articles || !data.articles.results || data.articles.results.length === 0) {
        res.json({ searchResults: [] });
        return;
      }

      const articles = data.articles.results;
      const searchResults = articles.map(article => ({
        id: uuidv4(),
        title: article.title,
        url: article.url
      }));

      res.json({ searchResults });
    })
    .catch(error => {
      console.error('error getting news data:', error);
      res.status(500).json({ error: `couldn't get news data` });
    });
}

module.exports = {
  getSearchResults,
};