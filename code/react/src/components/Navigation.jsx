import {Link} from 'react-router-dom';

export default function Navigation() {
  return (
      <header className='App-header'>
        <h1 className='App-title'>PICTORGRAM</h1>
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
