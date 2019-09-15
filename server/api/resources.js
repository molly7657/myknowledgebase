const router = require('express').Router()
const {Resource} = require('../db/models')
const {isAdmin, isCorrectUser} = require('./utils')
const multerMiddleware = require('./multermiddleware')

router.get('/:userId', isCorrectUser, async (req, res, next) => {
  const userId = req.params.userId
  try {
    const articles = await Resource.findAll({
      where: {userId}
    })
    res.json(articles)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/searchresults', isCorrectUser, async (req, res, next) => {
  try {
    const userId = req.params.userId
    const searchresults = await Resource.searchItems(
      userId,
      req.body.searchterm,
      req.body.sort
    )
    console.log('search results on the backend', searchresults)
    res.json(searchresults)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/articles', isCorrectUser, async (req, res, next) => {
  try {
    await Resource.create({
      name: req.body.name,
      type: req.body.type,
      Url: req.body.Url,
      userId: req.params.userId
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.post(
  '/:userId/files',
  multerMiddleware.single('file'),
  async (req, res, next) => {
    try {
      await Resource.create({
        name: req.file.originalname,
        type: 'file',
        Url: req.file.location,
        userId: req.params.userId
      })
      res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
