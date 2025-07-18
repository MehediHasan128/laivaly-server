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

export const uploadMultipleImage = async(files: {filePath: string; fileName: string}[]) => {

  const imageURL: string[] = [];

  const uploadImages = files.map((file) => cloudinary.uploader.upload(file.filePath, {public_id: file.fileName}).then((res) => {
    imageURL.push(res.secure_url);
    fs.unlink(file.filePath, (err) => {
      if(err){
        console.log(err);
      }
    })
  }).catch((err) => {
    console.log(err);
  }));

  await Promise.all(uploadImages);
  return imageURL;

}

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
