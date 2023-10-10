const categorytbl = require('../model/category')
const subcategorytbl = require('../model/subcategory')
const prodctTbl = require('../model/product')
const path = require('path')

const product = async (req, res) => {
    try {
        const { categoryId, subcategoryId, name, price, qty, description } = req.body;
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
    catch (err) {
        console.log(err);
        return false;
    }
}


const productupdate = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
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
// let results = await prodctTbl.find({}).populate('categoryId').populate('subcategoryId');

const productview = async (req, res) => {
    try {

        const results = await categorytbl.aggregate([
            {
                $lookup: {
                    from: 'subcategories',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'subcategoryview',
                },
            },
            {
                $unwind: "$subcategoryview"
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'productview',
                },
            },
            {
                $unwind: "$productview"
            },

        ]);
        if (results) {
            return res.json({ "product": results, status: 1 });
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