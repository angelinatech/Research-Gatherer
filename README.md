# Multi-Search

An aesthetic full stack research collation app. Made using React, Express, Node, and Postgress.

## Description

An aesthetic full stack research collation app. Useful for projects and homework assignments, and for the 'I'll get back to that later' readers of the world. Utilises several API endpoints which the user can search to find the information they are looking for including Wikipedia, PubMed, News API and Google.

The user will be able to create their own account where they are able to save the articles and websites that they need for later, and label them as they see fit.

This is phase one of the project. Future phases will incude categorising and sorting ability and importing option for outside documents and media to keep all of your research together in one place.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

## Getting Started

To use this application on your own system, follow these steps:

1. Clone this repository to your local machine.
2. Open your command line interface (CLI) and navigate to the cloned repository's directory.
3. Install all dependencies by running the command `npm install` in the relevant folders.
4. Create a `.env` file in the root directory of the project and provide the following environment variables:

```plaintext
USERNAME=           // Your PostgreSQL database username
PASSWORD=           // Your PostgreSQL database password
HOST=               // Your PostgreSQL database host
DBPORT=             // Your PostgreSQL database port
DATABASE=           // Your PostgreSQL database name
PORT=               // Port on which the server will run
JWT_SECRET=         // Secret key for JWT (JSON Web Tokens) encryption
NEWS_API_KEY=       // API key for the news API
GOOGLE_CX=          // Google Search Engine ID (CX)
GOOGLE_API_KEY=     // API key for Google API
REACT_APP_SERVERURL=// URL of your server (backend)
```

5. Save and run 'npm run dev' for the server and 'npm start' for the front end. Enjoy!

## Usage

When a user opens the application the Wikipedia research box will be visible as well as several options available in the Navbar.

The user may navigate to the available search options, which at the moment include Wikipedia, PubMed, a general News source API and Google. The user can also sign up for an account to save their collection under. Once logged in or signed up the user may research whatever they need to using the available searches and save them. Upon navigating to their collection page they will see their saved articles which they can delete, or edit the title of as wished. The user may then log out, though they will automatically be logged out after 12 hours. 

The following are sample images of the working application's functionality:

## Credits

**Dependencies**

* [linux_libertineregular](https://www.fonts4free.net/wikipedia-font.html): for the typeface 'Wikipedia Font'.
* [fontawesome](https://fontawesome.com/): for the icons.
* [Create-react-app](https://create-react-app.dev/): for initial creation.
* [react-router-dom](https://reactrouter.com/web/guides/quick-start): for page routing.
* [axios](https://axios-http.com/): to fetch data from the APIs.
* [dompurify](https://www.npmjs.com/package/dompurify): to clean up input entries and keep them safe.
* [dotenv](https://www.npmjs.com/package/dotenv): to store all my most precious secrets.
* [express](https://expressjs.com/): for routers and server-side logic.
* [bcrypt](https://www.npmjs.com/package/bcrypt): to securely hash passwords.
* [cors](https://www.npmjs.com/package/cors): to handle Cross-Origin Resource Sharing (CORS) and avoid CORS error messages.
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit): for rate limiting, to protect against brute-force attacks or excessive requests.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): to create JWT for authorization and login, etc.
* [jwt-decode](https://www.npmjs.com/package/jwt-decode): to decode JWT tokens.
* [pg](https://www.npmjs.com/package/pg): to work with PostgreSQL database (driver for Node.js).
* [react-cookie](https://www.npmjs.com/package/react-cookie): for cookies to help with authentication.
* [uuid](https://www.npmjs.com/package/uuid): for generating random unique identifiers.
* [nodemon](https://www.npmjs.com/package/nodemon): to listen for changes to JavaScript files during development.

**APIs**

* [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page): for retrieving data from Wikipedia.
* [PubMed API](https://www.ncbi.nlm.nih.gov/home/develop/api/): for accessing PubMed database and retrieving scientific literature information.
* [News API](https://newsapi.org/): for fetching news articles and headlines.
* [Google Search API](https://developers.google.com/custom-search/v1/introduction): for performing web searches and retrieving search results.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for more information.

## How to Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

Contributions are welcome! This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct.html) as its Code of Conduct. Feel free to contribute by submitting pull requests or opening issues.

## Tests

Not yet, future task to be implemented.
