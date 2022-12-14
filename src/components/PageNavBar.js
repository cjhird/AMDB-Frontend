import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated, loginTextDisplay } from '../auth/auth.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import React Bootstrap Components
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
const PageNavBar = () => {
  const navigate = useNavigate()
  const handleClick = (event) => {
    console.log(event.target.value)
    if (event.target.value !== '') {
      navigate('/search')
    } else {
      navigate('/')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('rcf-ani-token')
    toast.info('Goodbye! :(', {
      position: "top-left",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/')
    console.log('USER HAS LOGGED OUT')
  }

  return (
    <NavBar classname='nav' expand="md">
      <ToastContainer />
      <Container>
        <NavBar.Brand as={Link} to="/">
          🎥 <span className="logo fw-bold">ANIMOVIES</span>
        </NavBar.Brand>
        {userIsAuthenticated() && loginTextDisplay()}
        <NavBar.Toggle aria-controls="basic-navbar-nav"></NavBar.Toggle>
        <NavBar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {/* <div className="search-container text-md-center text-end my-md-0 my-3">
            <input
              type="text"
              className="seach"
              placeholder="Search..."
              onKeyUp={handleClick}
            ></input>
          </div> */}
          {userIsAuthenticated() ? (
            <>
              <Nav.Link as={Link} to="/search">
                <span className="underline ms-3"><span>🔎</span> Search</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/watchlist">
                <span className="underline ms-3">Watchlist</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                <span className="underline ms-3">Profile</span>
              </Nav.Link>
              <Nav.Link onClick={handleLogout} as={Link} to="/">
                <span className="underline ms-3">Logout</span>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/search">
                <span className="underline ms-3"><span>🔎</span> Search</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className=" ms-3">
                <span className="underline">Register</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className=" ms-3">
                <span className="underline">Login</span>
              </Nav.Link>
            </>
          )}
        </NavBar.Collapse>
      </Container>
    </NavBar>
  )
}

export default PageNavBar
