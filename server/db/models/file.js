const Sequelize = require('sequelize')
const db = require('../db')

const File = db.define('file', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  file: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  datePublished: {
    type: Sequelize.DATE
  }
})

module.exports = File
