import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Google from './Pages/Google/Google';
import NewsAPI from './Pages/News API/NewsAPI';
import PubMed from './Pages/PubMed/PubMed';
import Wikipedia from './Pages/Wikipedia/Wikipedia.js';
import UserCollection from './Pages/UserCollection/UserCollection';
import Layout from './Layout.js'
import './App.css'

// *~*~*~*~*~*~ routes to pages ~*~*~*~*~*~*

const App = () => {
  
  return (
          <Layout>
        <Router basename="/">
          <Routes>
          <Route path="/" element={<Wikipedia />} />
          <Route path="/google" element={<Google />} />
          <Route path="/news" element={<NewsAPI />} />
          <Route path="/pubmed" element={<PubMed />} />
          <Route path="/collection" element={<UserCollection />} />
          </Routes>
        </Router>
          </Layout>
  );
};

export default App;
