const User = require('./user')
const Resource = require('./resource')
const Tag = require('./tags')
const TagAssociation = require('./tagassociations')

User.hasMany(Resource)
Resource.belongsTo(User)
Resource.belongsToMany(Tag, {through: TagAssociation})
Tag.belongsToMany(Resource, {through: TagAssociation})
module.exports = {
  User,
  Resource,
  Tag,
  TagAssociation
}
