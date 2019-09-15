const User = require('./user')
const Resource = require('./resource')

User.hasMany(Resource)
Resource.belongsTo(User)
module.exports = {
  User,
  Resource
}
