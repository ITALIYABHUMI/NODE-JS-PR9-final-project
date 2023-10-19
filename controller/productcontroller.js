const categorytbl = require('../model/category')
const prodctTbl = require('../model/product')
const path = require('path')
const fs = require('fs')

const product = async (req, res) => {
    try {
        const { categoryId, subcategoryId, name, price, qty, description } = req.body;
        if (categoryId, subcategoryId, name, price, qty, description != "") {
            let productdata = await prodctTbl.create({
                categoryId: categoryId,
                subcategoryId: subcategoryId,
                name: name,
                price: price,
                qty: qty,
                description: description,
                image: req.file.path
            });
            if (productdata) {
                return res.json({ messege: "product is added", status: 1 })
            }
            else {
                return res.json({ messege: "product not added", status: 0 })
            }
        }
        else{
            return res.json({ messege: "field can't be blank", status: 0 })
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


const productupdate = async (req, res) => {
    try {
        const { id, categoryId, subcategoryId, name, price, qty, description } = req.body;
        let data = await prodctTbl.findByIdAndUpdate(id, {
            categoryId: categoryId,
            subcategoryId: subcategoryId,
            name: name,
            price: price,
            qty: qty,
            description: description,
            image: req.file.path
        });
        if (data) {
            return res.json({ messege: "product is updated", status: 1 });
        }
        else {
            return res.json({ messege: "product is not updated", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const productdelete = async (req, res) => {
    try {
        const id = req.body.id;
        let data = await prodctTbl.findByIdAndDelete(id);
        if (data) {
            fs.unlinkSync(data.image)
            return res.json({ messege: "product is deleted", status: 1 });
        }
        else {
            return res.json({ messege: "product is not deleted", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}

const productview = async (req, res) => {
    try {
        // let results = await prodctTbl.find({}).populate('categoryId').populate('subcategoryId');
        const results = await categorytbl.aggregate([
            {
                $lookup: {
                    from: 'subcategories',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'subcategory',
                },
            },
            { 
                $unwind: "$subcategory"
            },
            { 
                $lookup: {
                    from: 'products',
                    localField: 'subcategory._id',
                    foreignField: 'subcategoryId',
                    as: 'product',
                },
            }
        ]);
        if (results) { 
            return res.json({ "category": results, status: 1 });
        }
        else {
            return res.json({ messege: "subcategory is no fathed", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    product,
    productdelete,
    productupdate,
    productview
}