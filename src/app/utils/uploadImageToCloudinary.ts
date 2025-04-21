import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';
import multer from 'multer';

export const uploadImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  return cloudinary.uploader.upload(
    'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
    {
        public_id: 'name'
    },
    function(error, result) {
        console.log(result);
        fs.unlink('https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg', (err) => {
            if(err){
                console.error(err);
            }
        })
    }
  )
};


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, process.cwd() + '/uploads');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})


export const upload = multer({storage: storage});