const { nanoid } = require("nanoid");
const { AWS_S3 } = require("./config");
const fs = require("fs");

module.exports = uploadImage = async (file) => {
  const type = file.originalname.split(".")[1];
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${nanoid()}.${type}`,
    Body: fileStream,
    ACL: 'public-read',
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    AWS_S3.upload(params, (err, data) => {
      if(err){        
        reject(err)
      }                  
      resolve(data)
    });
  });
};
