const Sequelize = require('sequelize')
const db = require('../db')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const bucketName = 'personalknowledgebase'
const fs = require('fs')

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
  datePublished: {
    type: Sequelize.DATE
  }
})

//this method allows the user to upload a file to AWS when called upon in the POST route.
Resource.postToAWS = async function(userId, filepath) {
  const uploadParams = {
    Bucket: bucketName,
    Key: '',
    Body: '',
    Metadata: {
      userId
    }
  }
  const fileStream = fs.createReadStream('../../Desktop/4015.jpg')
  fileStream.on('error', function(err) {
    console.log('File Error', err)
  })
  uploadParams.Body = fileStream
  var path = require('path')
  uploadParams.Key = userId + '/' + path.basename('../../Desktop/4015.jpg')
  let awsLocation = `this hasn't been changed`
  await s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log('Error', err)
    }
    if (data) {
      Resource.create({
        name: path.basename('../../Desktop/4015.jpg'),
        type: 'file',
        Url: data.Location,
        userId
      })
      console.log('this file has been uploaded to AWS!')
    }
  })
}

Resource.getObject = async function(userId) {
  const params = {
    Bucket: 'personalknowledgebase',
    // Key: `${userId}/${req.body.name}`
    Key: '1/superlatives.pdf'
  }
  const file = await s3.getObject(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
  return file
}
//this method gives users capability to arrange their uploaded documents and links by date.
Resource.sortByDate = async function(userId) {
  const resources = await Resource.findAll({
    where: {userId},
    order: [['createdAt', 'ASC']]
  })
  return resources
}

//this method retrieves items that have the key search words in the title.
Resource.searchItems = async function(userId, searchTerm) {
  const resources = await Resource.findAll({
    where: {
      userId,
      name: {
        $like: `%${searchTerm}%`
      }
    }
  })
  return resources
}

module.exports = Resource
