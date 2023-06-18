

// *~*~*~* getting query from the search input *~*~*~* 

function extractSearchQuery(req, res, next) {
    const { searchQuery } = req.query;
    if (!searchQuery) {
              return res.status(400).json({ error: 'Missing required field: Search query' });
            }
    req.searchQuery = searchQuery; 
    next();
  }
  
  module.exports = {
    extractSearchQuery,
  };
  

