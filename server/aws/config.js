const aws = require('aws-sdk')

const config = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: process.env.AWS_SIGNATURE_VERSION,
    apiVersion: '2010-12-01'
}

const AWS_SES = new aws.SES(config)
const AWS_S3 = new aws.S3(config)

module.exports = {
    AWS_SES,
    AWS_S3
}