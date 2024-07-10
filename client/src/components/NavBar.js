import { Link } from 'react-router-dom';
import './styles.css';

function NavBar({user, setUser}){

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    })
      .then((r) => {
        if (r.ok) {
          setUser(null); // Clear user state upon successful logout
        }
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };
    return (
        <nav className='nav-bar'>
          <ul>
              {user ? (
                <>
                <Link to="/home">Home </Link>
                <Link to="/projects">Projects</Link>
                <Link to="/setting">Setting </Link>
                <Link to="/" onClick={handleLogout}>Logout </Link>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
          </ul>
        </nav>
      );

}

export default NavBar;