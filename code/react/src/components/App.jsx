import PageNotFound from './PageNotFound'
import Home from './Home'

import {Route, Link, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import CreatedImages from './CreatedImages';
import SharedImages from './SharedImages.jsx';
import SignUpOrLogin from './SignUpOrLogin.jsx';
import AboutUs from './AboutUs.jsx';
import ShowCreatedImages from './ShowCreatedImages';
import Create from './Create.jsx';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signUpOrLogin' element={<SignUpOrLogin />}/>
        <Route path='/logout'  />
        <Route path='/Create' element={<Create />}/>
        <Route path='/SharedImages' element={<SharedImages />}/> 
        <Route path='/ShowCreatedImages' element={<ShowCreatedImages />} />
        <Route path='/CreatedImages' element={<CreatedImages />} />
        <Route path='/Leaderboard' />
        <Route path='/AboutUs' element={<AboutUs />}/>
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App
