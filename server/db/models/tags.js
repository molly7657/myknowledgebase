const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const TagAssociation = require('./tagassociations')

const Tag = db.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://i.imgur.com/9EoWY43.png'
  }
})

Tag.beforeValidate(tag => {
  let newName = ''
  for (let i = 0; i < tag.name.length; i++) {
    if (tag.name[i] !== ' ') {
      newName += tag.name[i].toLowerCase()
    }
  }
  tag.name = newName
  return tag
})

Tag.addTag = async function(tag1, tag2, tag3, resourceId, userId) {
  if (tag1 !== '') {
    const foundTag1 = await Tag.findOne({where: {name: tag1}})
    if (foundTag1) {
      await TagAssociation.create({resourceId, tagId: foundTag1.id, userId})
    } else {
      const newTag1 = await Tag.create({name: tag1})
      await TagAssociation.create({resourceId, tagId: newTag1.id, userId})
    }
  }
  if (tag2 !== '') {
    const foundTag2 = await Tag.findOne({where: {name: tag2}})
    if (foundTag2) {
      await TagAssociation.create({resourceId, tagId: foundTag2.id, userId})
    } else {
      const newTag2 = await Tag.create({name: tag2})
      await TagAssociation.create({resourceId, tagId: newTag2.id, userId})
    }
  }
  if (tag3 !== '') {
    const foundTag3 = await Tag.findOne({where: {name: tag3}})
    if (foundTag3) {
      await TagAssociation.create({resourceId, tagId: foundTag3.id, userId})
    } else {
      const newTag3 = await Tag.create({name: tag3})
      await TagAssociation.create({resourceId, tagId: newTag3.id, userId})
    }
  }
}
module.exports = Tag
