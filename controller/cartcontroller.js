const cartTbl = require('../model/cart')
const productTbl = require('../model/product')
const path = require('path');

const cart = async (req, res) => {
    try {
        const product = await productTbl.findById(req.body.id);
        const cart = await cartTbl.findOne({ productId: req.body.id });
        if (cart) {
            return res.json({ messege: "product is already in the cart", status: 0 });
        }
        else {
            if (product) {
                const cartdata = await cartTbl.create({
                    productId: req.body.productId,
                    name: product.name,
                    price: product.price,
                    qty: product.qty,
                    description: product.description,
                    image: product.image
                });
                return res.json({ messege: "product is added in cart", status: 1 });
            }
            else {
                return res.json({ messege: "product not added in cart", status: 0 });
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


const cartdelete = async (req, res) => {
    try {
        const id = req.body.id;
        let data = await cartTbl.findByIdAndDelete(id);
        if (data) {
            return res.json({ messege: "cart is deleted", status: 1 });
        }
        else {
            return res.json({ messege: "cart is not deleted", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}

const cartview = async (req, res) => {
    try {
        const cartdata = await cartTbl.find({});
        if (cartdata) {
            return res.json({ "cartdata": cartdata, status: 1 });
        }
        else {
            return res.json({ messege: "cartdata is no fathed", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}

const cartupdate = async (req, res) => {
    try {
        const { id, productId, name, price, qty, description } = req.body;
        let cartdata = await cartTbl.findByIdAndUpdate(id, {
            productId: productId,
            name: name,
            price: price,
            qty: qty,
            description: description,
            image :req.file.path
        });
        if (cartdata) {
            return res.json({ message : "cart is updated", status: 1 });
        }
        else{
            return res.json({ message : "cart is not updated", status: 1 });
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    cart,
    cartdelete,
    cartview,
    cartupdate
}