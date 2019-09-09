const router = require('express').Router()
const {File} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const files = await File.findAll()
    res.json(files)
  } catch (err) {
    next(err)
  }
})

router.get('/:fileId', async (req, res, next) => {
  try {
    const fileId = Number(req.params.fileId)
    const file = await File.findByPk(fileId)
    res.json(file)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    await File.create({
      name: res.body.name,
      file: res.body.file,
      datePublished: res.body.datePublished
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

module.exports = router
