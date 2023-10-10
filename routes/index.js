const express = require('express');
const multer = require('multer');

const route = express.Router();

const passport = require('passport');
const { verifyToken } = require('../config/passport-jwt');
const { checkRole } = require('../config/passport-jwt');

const indexcontroller = require('../controller/indexcontroller')
const categorycontroller = require('../controller/categorycontroller')
const subcategorycontroller = require('../controller/subcategorycontroller')
const productcontroller = require('../controller/productcontroller')

const fileUpload = multer.diskStorage({
    destination : (req,res,cb) => {
           cb(null,'./uploads');
    },
    filename : (req,file,cb) => {
        cb(null,Date.now()+file.originalname);
    }
})

const imageUpload = multer({storage : fileUpload}).single('image');


route.post('/login', indexcontroller.login);
route.get('/index', verifyToken, checkRole('admin'), indexcontroller.index);
route.post('/register', indexcontroller.register);
route.put('/registerupdate', indexcontroller.update);
route.delete('/registerdelete', indexcontroller.deletedata);

route.post('/category', categorycontroller.category);
route.delete('/categorydelete', categorycontroller.categorydelete);
route.put('/categoryupdate', categorycontroller.categoryupdate);
route.get('/categoryview', categorycontroller.categoryview);

route.post('/subcategory', subcategorycontroller.subcategory);
route.delete('/subcategorydelete', subcategorycontroller.subcategorydelete);
route.put('/subcategoryupdate', subcategorycontroller.subcategoryupdate);
route.get('/subcategoryview', subcategorycontroller.subcategoryview);

route.post('/product',imageUpload, productcontroller.product);
route.delete('/productdelete', productcontroller.productdelete);
route.put('/productupdate', imageUpload,productcontroller.productupdate);
route.get('/productview', productcontroller.productview);

module.exports = route;       