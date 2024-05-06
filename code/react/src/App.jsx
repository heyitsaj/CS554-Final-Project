import PageNotFound from './components/PageNotFound'
import Home from './components/Home'
import Navigation from './components/Navigation'
import SharedImages from './components/SharedImages';
import CreatedImages from './components/CreatedImages';

import {Route, Link, Routes } from 'react-router-dom';
import { useState} from 'react'
import './App.css'
import Create from './components/Create';

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
        <Route path='/SharedImages' element={<SharedImages />} />
        <Route path='/CreatedImages' element={<CreatedImages />} />
        <Route path='/Create' element={<Create />}/>
        <Route path='/Leaderboard' />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default App
