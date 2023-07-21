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


export const download = async (bucketName, file, path) => {

  AWS.config.update({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: region,
  });

  const s3 = new AWS.S3();

  const options = {
    Bucket: bucketName,
    Key: file,
  };

  try {

    const fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(fs.createWriteStream(path))
      .on('error', function (err) {
        console.error('Error saving file:', err);
      })
      .on('close', function () {
        console.log('File saved successfully.');
      });

  } catch (err) {
    console.error(err);
  }
}