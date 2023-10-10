const express = require('express');
const port = 6600;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const db = require('./config/mongoose')

// const passportjwt = require('./config/passport-jwt');

app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Server start on port :" + port);
})