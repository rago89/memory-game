import * as fs from 'fs';
import * as path from 'path';

const deleteImageAsync = async (fileName: string, imageFolder: string) => {
  fs.unlink(
    path.join(__dirname, '..', 'images', `${imageFolder}`, `${fileName}`),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`\nDeleted file: ${fileName}`);
      }
    }
  );
};

const deleteImageSync = (fileName: string, imageFolder: string) => {
  fs.unlink(
    path.join(__dirname, '..', 'images', `${imageFolder}`, `${fileName}`),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`\nDeleted file: ${fileName}`);
      }
    }
  );
};

export { deleteImageAsync, deleteImageSync };
