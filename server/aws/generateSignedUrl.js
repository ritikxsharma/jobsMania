const { nanoid } = require("nanoid");
const { AWS_S3 } = require("./config");

module.exports = generateSignedUrl = async (fileType) => {

  const fileExt = fileType.split("/")[1]
  
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${nanoid()}.${fileExt}`,
    ACL: 'public-read',
    Expires: 60,
    ContentType: fileType,
  };

  return {uploadURL: await AWS_S3.getSignedUrlPromise("putObject", params), Key:params.Key}
};
