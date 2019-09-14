const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.STRING
    // validate: {
    //   isUrl: true
    // }
  },
  tags: {
    type: Sequelize.STRING
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
    if (dateSearch === 'descending') {
      const resources = await Resource.findAll({
        where: {
          userId,
          name: {
            $like: `%${searchTerm}%`
          },
          order: [['createdAt', 'DESC']]
        }
      })
      return resources
    } else {
      const resources = await Resource.findAll({
        where: {
          userId,
          name: {
            $like: `%${searchTerm}%`
          },
          order: [['createdAt', 'ASC']]
        }
      })
      return resources
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = Resource

module.exports = Resource
