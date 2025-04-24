/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';
import multer from 'multer';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadImageToCloudinary = async (
  files: { imagePath: string; imageName: string }[],
) => {

    const results: any[] = [];

  const uploadPromises = files.map((file) =>
    cloudinary.uploader
      .upload(file.imagePath, { public_id: file.imageName })
      .then((res) => {
        results.push(res);
        fs.unlink(file.imagePath, (err) => {
            if(err){
                console.log(err);
            }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  );

  await Promise.all(uploadPromises);
  return results
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
