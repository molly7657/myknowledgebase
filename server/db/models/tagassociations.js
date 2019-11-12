const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')

const TagAssociation = db.define('tagassociation', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = TagAssociation
