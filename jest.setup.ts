import '@testing-library/jest-dom';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.test') });

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
