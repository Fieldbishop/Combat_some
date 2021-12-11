const multer = require('multer');
const path = require('path');
const desiredPath = path.normalize(path.join(__dirname,'..' ,'/public/images'));

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,desiredPath);
    },
    filename: (req,file,cb) =>{
        cb(null, + Date.now() + "-" + file.originalname);
    }
});

module.exports.storage = storage;
module.exports.path = desiredPath;
/*
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        fs.mkdir(desiredPath, (err) => {
            if (err) {
                console.log(err.stack);
                fs.readdir(desiredPath, (readError => {
                    if (readError) {
                        console.log(err.stack);
                    } else {
                        callback(null, desiredPath);
                    }
                }))
            } else {
                callback(null, desiredPath);
            }
        })
    },
    filename: function (req, file, callback) {
        let fileLength = fs.readdirSync(desiredPath, (err, files) => {
            callback(null, files.length);
        })
        callback(null, file.name + "-" + fileLength);
    }
})
 */