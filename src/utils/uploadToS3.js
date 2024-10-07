import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, } from "@aws-sdk/client-s3";

import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET, REGION } from '../utils/constants';

const uploadToS3 = async (file, onProgress = null) => {
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
    },
  });

  const Key = new Date().getTime() + file.name.replace(/\s/g, '');

  try {
    const params = {
      Bucket: AWS_BUCKET,
      Key,
      Body: file,
      ContentDisposition: 'inline',
      ContentType: file.type,
    };
    const options = {
      partSize: 150 * 1024 * 1024, // 150 MB parts
      queueSize: 4,
      leavePartsOnError: false,
    };

    const parallelUploadS3 = new Upload({
      client: s3Client,
      params,
      ...options,
    });

    parallelUploadS3.on('httpUploadProgress', (progress) => {
      const percentUploaded = Math.round((progress.loaded / progress.total) * 100);
      onProgress && onProgress(percentUploaded);
    });

    await parallelUploadS3.done();

    return Key;
  } catch (error) {
    console.error('Error uploading file to S3', error);
    throw error;
  }
};

export default uploadToS3;
