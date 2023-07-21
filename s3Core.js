import { awsAccessKeyId, awsSecretAccessKey } from "./config.js";
import AWS from 'aws-sdk';

import fs from "fs";
const region = 'us-west-1'

export const upload = async (bucketName, file, filePath) => {

  AWS.config.update({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: region,
  });

  const params = {
    Bucket: bucketName,
    Key: file,
    Body: fs.createReadStream(filePath),
  };

  const s3 = new AWS.S3();

  s3.upload(params, function (err, data) {
    if (err) {
      console.error('Error uploading file:', err);
    } else {
      console.log('File uploaded successfully. Location:', data.Location);
    }
  });
};
