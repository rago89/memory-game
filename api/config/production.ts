import { Config } from './interface';

const productionConfig: Config = {
  MODE: 'production',
  PORT: process.env['PORT'],
  DATA_DIR: process.env['DATA_DIR'],
  STATIC_DIR: process.env['STATIC_DIR'],
  DB_PATH: process.env['DB_PATH'],
};

export default productionConfig;
