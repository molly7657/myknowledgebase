const router = require('express').Router()
const {Article} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const articles = await Article.findAll()
    res.json(articles)
  } catch (err) {
    next(err)
  }
})

router.get('/:articleId', async (req, res, next) => {
  try {
    const articleId = Number(req.params.articleId)
    const article = await Article.findByPk(articleId)
    res.json(article)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    await Article.create({
      name: res.body.name,
      Url: res.body.Url,
      datePublished: res.body.datePublished
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

module.exports = router
