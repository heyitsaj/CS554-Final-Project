import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Ensure to import the CSS file
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutUser } from '../firebase/firebase-src';

function Navigation() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const signedIn = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => signedIn();
  }, []);

  const onSignUpOrLogin = () => {
    navigate('/signUpOrLogin');
  }

  const onSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      navigate('/');
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div>
      {user ?
       <button
         onClick={onSignOut}
         style={{ position: 'fixed', top: 30, right: 10, borderColor: 'black' }}
       >
         Sign Out
       </button> :
      <button
        onClick={onSignUpOrLogin}
        style={{ position: 'fixed', top: 30, right: 10, borderColor: 'black' }}
      >
        Sign Up/Login
      </button>}
      <nav className='nav-bar'>
        <Link className='nav-link' to='/SharedImages' onClick={user ? undefined : (e) => {
          e.preventDefault();
          alert("You must have an account to access this feature.")
        }}
        >
          Image Sharing
        </Link>
        <Link className='nav-link' to='/Create' onClick={user ? undefined : (e) => {
          e.preventDefault();
          alert("You must have an account to access this feature.")
        }}
        >
          Image Creation
        </Link>
        <Link className='nav-link' to='/ShowCreatedImages' onClick={user ? undefined : (e) => {
          e.preventDefault();
          alert("You must have an account to access this feature.")
        }}
        >
          Created Images
        </Link>
        <Link className='nav-link' to='/Leaderboard' onClick={user ? undefined : (e) => {
          e.preventDefault();
          alert("You must have an account to access this feature.")
        }}
        >
          Leaderboard
        </Link>
        <Link className='nav-link' to='/AboutUs'>
          About Us
        </Link>
        {user && 
        user.email && 
          <Link className='nav-link-user'>
          Current User: {user && user.email}
        </Link>
        }
      </nav>
    </div>
  );
}

export default Navigation;
