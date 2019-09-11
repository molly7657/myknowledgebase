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
  const fileStream = fs.createReadStream('../../Desktop/superlatives.pdf')
  fileStream.on('error', function(err) {
    console.log('File Error', err)
  })
  uploadParams.Body = fileStream
  var path = require('path')
  uploadParams.Key =
    userId + '/' + path.basename('../../Desktop/superlatives.pdf')
  let awsLocation = `this hasn't been changed`
  await s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log('Error', err)
    }
    if (data) {
      awsLocation = data.Location
      console.log('this file has been uploaded to AWS!')
    }
  })
  Resource.create({
    name: path.basename('../../Desktop/superlatives.pdf'),
    type: 'file',
    Url: uploadParams.key,
    userId
  })
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
      $like: `%${searchTerm}%`
    }
  })
}

module.exports = Resource
