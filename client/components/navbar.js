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
    <AppBar position="static" style={{background: '#E88EB8'}}>
      <h1 style={{padding: 15, color: 'black'}} align="right">
        The Personal Knowledge Base
      </h1>
      {isLoggedIn ? (
        <Toolbar>
          <Typography variant="button">
            <div align="right">
              <Link to="/home" style={{padding: 15, color: 'black'}}>
                {' '}
                Home
              </Link>
              <Link to="/resources" style={{padding: 15, color: 'black'}}>
                My Knowledge Base
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

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
