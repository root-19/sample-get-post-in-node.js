const database = require('../../database/database');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        // cb(null,date.now() + path.extname)
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null.date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage});

const send = (req,res) => {
    upload.file('image')(req,res,(error) => {
        if(error) {
            return res.status(500).send('error uploading image');

        }

        const imagePath = req.file.path;

        const message = req.file.message || '';

        const query = 'INSERT INTO  messages (image_path, message) VALUES (?, ?)';

        database,query(query, [imagePath, message], (error,results) => {
            if(error) {
                console.error("error saving databse");
                return res.status(500).send("error saving data");
            }
            res.status(200).send('file upload  save to databse successfully');
        });
    });
};

module.exports = {send};