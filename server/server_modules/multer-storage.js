const multer = require('multer');
const path = require('path');

/**
 * File path
 * @type {string}
 */
const desiredPath = path.normalize(path.join(__dirname, '..', '/public/images'));

/**
 * Handles where multer stores the files and the naming convention
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, desiredPath);
    },
    filename: (req, file, cb) => {
        cb(null, +Date.now() + "-" + file.originalname);
    }
});

/**
 * Exported for application wide usage
 * @type {DiskStorage}
 */
module.exports.storage = storage;

/**
 * Exported for application wide usage
 * @type {string}
 */
module.exports.path = desiredPath;