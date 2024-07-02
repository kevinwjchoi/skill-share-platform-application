import { Link } from 'react-router-dom';
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
              <Link to="/home">Home </Link>
              {user ? (
                <Link to="/home" onClick={handleLogout}>Logout </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
              
          </ul>
        </nav>
      );

}

export default NavBar;