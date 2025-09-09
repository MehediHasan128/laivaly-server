import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadSingleImageToCloudinary = async (
  filePath: string,
  fileName: string,
) => {
  const res = await cloudinary.uploader
    .upload(filePath, { public_id: fileName })
    .catch((err) => console.log(err));

  if (res) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  return res;
};

export const uploadMultipleImage = async (
  files: { path: string; filename: string }[],
) => {
  const imageURLs: string[] = [];

  for(const file of files){
    try{
      const res = await cloudinary.uploader.upload(file.path, {
        public_id: file.filename,
      });
      imageURLs.push(res.secure_url);

      fs.unlink(file.path, (err) => {
        if (err) console.log(err);
      });
    }catch(err){
      console.log("Upload failed for file:", file.filename, err);
    }
  }

  return imageURLs;
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
