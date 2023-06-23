const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// console.log({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.S3_REGION,
//   bucket: process.env.S3_BUCKET,
// });

const config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION,
}

const client = new S3Client(config);
// console.log(s3Config);

const s3Storage = multerS3({
  s3: client,
  bucket: process.env.S3_BUCKET,
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  },
});

function validateFile(file, cb) {
  const isAllowedExtenstion = file.originalname.match(/\.(jpeg|jpg|png)$/);
  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (!(isAllowedExtenstion && isAllowedMimeType))
    return cb("Error: File type not allowed!");
  return cb(null, true);
}

const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, cb) => {
    validateFile(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});


const deleteImage = async (key, bucket) => {
  const input = {
    Bucket: bucket || process.env.S3_BUCKET,
    Key: key,
  }
  const command = new DeleteObjectCommand(input);
  const response = await client.send(command);
  return response;
}


module.exports = {uploadImage, deleteImage};
