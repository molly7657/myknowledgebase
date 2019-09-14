const router = require('express').Router()
const {Resource} = require('../db/models')
const {isAdmin, isCorrectUser} = require('./utils')
const multerMiddleware = require('./multermiddleware')

router.get('/', async (req, res, next) => {
  try {
    const articles = await Resource.findAll()
    res.json(articles)
  } catch (err) {
    next(err)
  }
})

// router.get('/files/:resourceId', async (req, res, next) => {
//   try {
//     const resourceId = Number(req.params.resourceId)
//     const resource = await Resource.findAll({where:{userId}})
//     console.log(resource)
//     const newJSON = JSON.parse(resource.Body.toString())
//     res.send(newJSON)
//   } catch (err) {
//     next(err)
//   }
// })

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
        Url: req.file.location
      })
      res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
