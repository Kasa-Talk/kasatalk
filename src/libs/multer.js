import multer from 'multer';
import { storage as _storage } from '../config/firebase.config';

const bucket = _storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({ storage });

export { upload, bucket };