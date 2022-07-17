import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './api/images/avatar-uploads/');
  },
  filename: (req, file, cb) => {
    // eslint-disable-next-line prefer-template
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const imageFilter = (req: any, file: any, callback: any) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/webp'
  ) {
    callback(null, true);
  } else {
    callback(new Error('Only jpeg, png, jpg and webp images are allowed'));
  }
};

const upload = multer({
  storage: storageImage,
  limits: {
    fileSize: 90097520,
  },
  fileFilter: imageFilter,
});

export default upload;
