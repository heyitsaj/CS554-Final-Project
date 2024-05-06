import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Ensure to import the CSS file

export default function Home() {
  const navigate = useNavigate();

  const onLoginOrSignUp = () => {
    navigate('/signUpOrLogin');
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome to Pictogram!</h1>
      <button
        onClick={onLoginOrSignUp}
        style={{ position: 'fixed', top: 30, right: 10, borderColor: 'black' }}
      >
        Sign Up/Login
      </button>
      <nav className='nav-bar'>
        <Link className='nav-link' to='/'>
          Home
        </Link>
        <Link className='nav-link' to='/SharedImages'>
          Image Sharing
        </Link>
        <Link className='nav-link' to='/CreatedImages'>
          Image Creation
        </Link>
        <Link className='nav-link' to='/Leaderboard'>
          Leaderboard
        </Link>
        <Link className='nav-link' to='/AboutUs'>
          About Us
        </Link>
      </nav>
    </div>
  );
}
