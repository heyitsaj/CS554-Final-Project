import PageNotFound from './components/PageNotFound'
import Home from './components/Home'
import Navigation from './components/Navigation'

import {Route, Link, Routes } from 'react-router-dom';
import { useState} from 'react'
import './App.css'

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
        <Route path='/CreatedImages' />    
        <Route path='/Leaderboard' />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App
