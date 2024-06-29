import { Link } from 'react-router-dom';
function NavBar(){


    return (
        <nav className='nav-bar'>
          <ul>
              <Link to="/home">Home </Link>
              <Link to="/login">Login </Link>
              <Link to="/signup">Signup</Link>
          </ul>
        </nav>
      );

}

export default NavBar;