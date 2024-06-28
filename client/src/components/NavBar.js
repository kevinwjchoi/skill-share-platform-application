import { Link } from 'react-router-dom';
function NavBar(){


    return (
        <nav className='nav-bar'>
          <ul>
              <Link to="/">Home </Link>
          </ul>
          <ul>
            <Link to="/userform">Create a new user</Link>
          </ul>
        </nav>
      );

}

export default NavBar;