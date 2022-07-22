// let's import the default configuration
import defaultConfig from './default';
import developmentConfig from './development';
import productionConfig from './production';
import { Config } from './interface';

const configEnv = process.env['NODE_ENV'];

let finalConfig: Config;

switch (configEnv) {
  case 'development':
    finalConfig = developmentConfig;
    break;
  case 'production':
    finalConfig = productionConfig;
    break;
  default:
    finalConfig = defaultConfig;
    break;
}

export default finalConfig;
