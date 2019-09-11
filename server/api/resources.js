const router = require('express').Router()
const {Resource} = require('../db/models')
const {isAdmin} = require('./utils')

router.get('/', async (req, res, next) => {
  try {
    const articles = await Resource.findAll()
    res.json(articles)
  } catch (err) {
    next(err)
  }
})

router.get('/files/:resourceId', async (req, res, next) => {
  try {
    const resourceId = Number(req.params.resourceId)
    const resource = await Resource.getObject(1)
    console.log(resource)
    const newJSON = JSON.parse(resource.Body.toString())
    res.send(newJSON)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/articles', async (req, res, next) => {
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

router.post('/:userId/files', async (req, res, next) => {
  try {
    Resource.postToAWS(req.params.userId)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

module.exports = router
