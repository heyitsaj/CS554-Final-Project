import PageNotFound from './PageNotFound'
import Home from './Home'
import Navigation from './Navigation'

import {Route, Link, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import CreatedImages from './Created';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <br />
      <br />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' />
        <Route path='/logout'  />
        <Route path='/SharedImages' />
        <Route path='/CreatedImages' element={<CreatedImages />}/>    
        <Route path='/Leaderboard' />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App
