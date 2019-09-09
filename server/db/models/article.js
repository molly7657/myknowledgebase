const Sequelize = require('sequelize')
const db = require('../db')

const Article = db.define('article', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  datePublished: {
    type: Sequelize.DATE
  }
})

module.exports = Article
