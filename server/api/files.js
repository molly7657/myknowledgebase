const router = require('express').Router()
const {File} = require('../db/models')
const {isAdmin, isCorrectUser} = require('./utils')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const files = await File.findAll()
    res.json(files)
  } catch (err) {
    next(err)
  }
})

// router.get('/:fileId', isCorrectUser, async (req, res, next) => {
//   try {
//     const fileId = Number(req.params.fileId)
//     const file = await File.findByPk(fileId)
//     res.json(file)
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/upload/:userId', async (req, res, next) => {
  try {
    const newFile = File.postToAWS(req.params.userId)
    console.log(newFile)
    await File.create({
      name: newFile.data.key,
      reference: newFile.data.Location
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

module.exports = router
