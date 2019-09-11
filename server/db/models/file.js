const Sequelize = require('sequelize')
const db = require('../db')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const bucketName = 'personalknowledgebase'
const fs = require('fs')

const File = db.define('file', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reference: {
    type: Sequelize.STRING,
    allowNull: false
  },
  datePublished: {
    type: Sequelize.DATE
  }
})

//this method allows the user to upload a file to AWS when called upon in the PUT route.
File.postToAWS = async function(userId, filepath) {
  const uploadParams = {
    Bucket: bucketName,
    Key: '',
    Body: '',
    Metadata: {
      userId
    }
  }
  const fileStream = fs.createReadStream('../../Desktop/superlatives.pdf')
  console.log(fileStream)
  fileStream.on('error', function(err) {
    console.log('File Error', err)
  })
  uploadParams.Body = fileStream
  var path = require('path')
  uploadParams.Key = path.basename('../../Desktop/superlatives.pdf')
  const data = await s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log('Error', err)
    }
    if (data) {
      return data
    }
  })
  console.log(data)
  return data
}

//this method gathers all files uploaded by a specific user.
File.findUserFiles = async function(userId) {
  try {
    const allFiles = this.findAll({
      where: {
        userId
      }
    })
    return allFiles
  } catch (error) {
    console.error(error)
  }
}

module.exports = File
