import PageNotFound from './PageNotFound'
import Home from './Home'

import {Route, Link, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import CreatedImages from './Created';
import SignUpOrLogin from './SignUpOrLogin.jsx';

function App() {
  return (
    <div className='App'>
      <br />
      <br />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signUpOrLogin' element={<SignUpOrLogin />}/>
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
