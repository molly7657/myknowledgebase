const {Order, User} = require('../db/models')

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.send('not an admin')
  }
}

function isCorrectUser(req, res, next) {
  let id = parseInt(req.params.userId, 10)
  if (req.user && req.user.id === id) {
    next()
  } else {
    res.status(405).send('Not Correct User')
  }
  console.log('req.user', req.user.id)
  console.log('params', id)
}

module.exports = {
  isCorrectUser,
  isAdmin
}
