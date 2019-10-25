const multer = require('multer')
const path = require("path")

module.exports = (app) => {

    let uploader = multer({
        storage: multer.diskStorage({
            destination: function(req, file, callback) {
                callback(null, './uploads')
            },
            filename: function(req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        })
    })

    return uploader
}