const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3()

const findKey = (req, file, cb) => {
  console.log('file.originalname: ', file.originalname)
  cb(null, file.originalname)
}

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: 'personalknowledgebase',
    acl: 'public-read',
    key: findKey
  })
})
