const {Order, User} = require('../db/models')

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.send('not an admin')
  }
}

function isCorrectUser(req, res, next) {
  let id = parseInt(req.params.userId)
  if (req.user && req.user.id === id) {
    next()
  } else {
    res.send('Not Correct User')
  }
  console.log('req.user', req.user.id)
  console.log('params', id)
}

async function isUser(req, res, next) {
  const request = req.body
  try {
    const user = await User.findbyPk(request.user.id)
    if (user) {
      next()
    }
    res.send('not a User')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  isCorrectUser,
  isUser,
  isAdmin
}
