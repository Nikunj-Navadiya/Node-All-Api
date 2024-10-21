const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

//Configuration
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dogf8zihu',
    api_key: '881733956734863',
    api_secret: 'HWpd1ITgQ6M1DU7hYQuRF63KFtI'
});

const cors = require('cors');

app.use(cors());

app.use(express.urlencoded());

app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})