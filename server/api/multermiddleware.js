const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const bucketName = require('../../secrets')

const s3 = new aws.S3()

const findKey = (req, file, cb) => {
  cb(null, file.originalname)
}

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read',
    key: findKey
  })
})
