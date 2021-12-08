const multer = require('multer');
const fs = require('fs');
let desiredPath = './public/images';
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
module.exports = storage;