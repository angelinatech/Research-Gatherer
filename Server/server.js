const port = process.env.PORT || 3000;
const wikiAPIRoute = require('./APIEndpoints/wikiAPIEndpoint');
const GoogleAPIRoute = require('./APIEndpoints/GoogleAPIEndpoint');
const NewsAPIRoute = require('./APIEndpoints/NewsAPIEndpoint');
const PubMedAPIRoute = require('./APIEndpoints/PubMedAPIEndpoint');
const myCollectionRoute = require('./MyCollectionEndpoints')
const SignUpRoute = require('./AccountEndpoints/SignUpRoute')
const SignInRoute = require('./AccountEndpoints/SignInRoute')
const bodyParser = require('body-parser');

const express = require('express');
const cors = require('cors');

const rateLimit = require('express-rate-limit')
const app = express();

app.use(cors());
app.use(bodyParser.json());

// *~*~*~* rate limiting 100 per 15min to all routes *~*~*~*

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
});
app.use(limiter);



// *~*~*~* API Routes *~*~*~*

app.use('/wiki', wikiAPIRoute);
app.use('/google', GoogleAPIRoute);
app.use('/news', NewsAPIRoute);
app.use('/pubmed', PubMedAPIRoute);

// *~*~*~* Database Routes *~*~*~*

app.use('/mycollection', myCollectionRoute);
app.use('/signup', SignUpRoute);
app.use('/login', SignInRoute);



// *~*~*~* just making sure we're good *~*~*~*

app.get("/", (req, res) => {
  res.send(`Hiiiii welcome to port ${port}!!`);
});

app.listen(port, () => {
  console.log(`Yooooooo welcome to port ${port}!!`);
});
