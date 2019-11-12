const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const Tag = require('./tags')

const Resource = db.define('resource', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('file', 'link'),
    allowNull: false
  },
  Url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

//this method gives users capability to arrange their uploaded documents and links by date.
Resource.sortByDate = async function(userId) {
  const resources = await Resource.findAll({
    where: {userId},
    order: [['createdAt', 'ASC']]
  })
  return resources
}

//this method retrieves items that have the key search words in the title, and gives users the option to sort descending if they so choose, otherwise data would be retrieved by ascending order.
Resource.searchItems = async function(userId, searchTerm, dateSearch) {
  try {
    if (dateSearch === 'Descending') {
      const resources = await Resource.findAll({
        where: {
          name: {[Op.iLike]: `%${searchTerm}%`},
          userId
        },
        order: [['createdAt', 'DESC']]
      })
      return resources
    } else {
      const resources = await Resource.findAll({
        where: {
          name: {[Op.iLike]: `%${searchTerm}%`},
          userId
        },
        order: [['createdAt', 'ASC']]
      })
      return resources
    }
  } catch (err) {
    console.error(err)
  }
}

Resource.prototype.findTags = async function() {
  try {
    const tags = await this.findAll({
      include: [{model: Tag}]
    })
    return tags
  } catch (error) {
    console.error(error)
  }
}

module.exports = Resource
