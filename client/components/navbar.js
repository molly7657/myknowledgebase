import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <AppBar position="static" style={{background: '#DC5A5E'}}>
      <h1>The Personal Knowledge Base</h1>
      {isLoggedIn ? (
        <Toolbar>
          <Typography variant="button">
            <div align="right">
              {/* The navbar will show these links after you log in */}
              <Link to="/home" style={{padding: 15, color: 'black'}}>
                {' '}
                Home
              </Link>
              <Link to="/resources" style={{padding: 15, color: 'black'}}>
                My Knowledge Base
              </Link>
              <Link to="/upload" style={{padding: 15, color: 'black'}}>
                Upload New Document
              </Link>
              <a
                href="#"
                onClick={handleClick}
                style={{padding: 15, color: 'black'}}
              >
                Logout
              </a>
            </div>
          </Typography>
        </Toolbar>
      ) : (
        <Toolbar>
          <Typography variant="button">
            {/* The navbar will show these links before you log in */}
            <Link to="/home" style={{padding: 15, color: 'black'}}>
              Home
            </Link>
            <Link to="/login" style={{padding: 15, color: 'black'}}>
              Login
            </Link>
            <Link to="/signup" style={{padding: 15, color: 'black'}}>
              Sign Up
            </Link>
          </Typography>
        </Toolbar>
      )}
    </AppBar>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
