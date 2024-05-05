import {Link, useNavigate} from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const onLoginOrSignUp = () => {
    navigate('/signUpOrLogin');
  } 

  return (
      <header className='App-header'>
        <h1 className='App-title'>PICTORGRAM</h1>
        <button onClick={onLoginOrSignUp} style={{position: 'fixed', top: 30, right: 10, borderColor: 'black'}}>Sign Up/Login</button>
        <Link className='listTab' to='/'>
          Home
        </Link>
        <br />
        <Link className='listTab' to='/SharedImages'>
          Image Sharing
        </Link>
        <br />
        <Link className='listTab' to='/CreatedImages'>
          Image Creation
        </Link>
        <br />
        <Link className='listTab' to='/Leaderboard'>
          Leaderboard
        </Link>
      </header>
  );
}