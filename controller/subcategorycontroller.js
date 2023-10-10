const categorytbl = require('../model/category');
const subcategorytbl = require('../model/subcategory');

const subcategory = async (req, res) => {
    try {
        const { categoryId, subcategory } = req.body;
        let subcategorydata = await subcategorytbl.create({
            categoryId: categoryId,
            subcategory: subcategory
        });
        if (subcategorydata) {
            return res.json({ messege: "subcategory is added", status: 1 })
        }
        else {
            return res.json({ messege: "subcategory is not added", status: 0 })
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const subcategoryupdate = async (req, res) => {
    try {
        const { id, categoryId, subcategory } = req.body;
        let data = await subcategorytbl.findByIdAndUpdate(id, {
            categoryId: categoryId,
            subcategory: subcategory
        });
        if (data) {
            return res.json({ messege: "subcategory is updated", status: 1 });
        }
        else {
            return res.json({ messege: "subcategory is not updated", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const subcategorydelete = async (req, res) => {
    try {
        const id = req.body.id;
        let data = await subcategorytbl.findByIdAndDelete(id);
        if (data) {
            return res.json({ messege: "subcategory is deleted", status: 1 });
        }
        else {
            return res.json({ messege: "subcategory is not deleted", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}

const subcategoryview = async (req, res) => {
    try {
        // let data = await subcategorytbl.find({}).populate('categoryId');
        const results = await categorytbl.aggregate([
            {
                $lookup: {
                    from: 'subcategories',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'subcategoryview',
                },
            },
        ]);
        if (results) {
            return res.json({ "subcategory": results, status: 1 });
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
    subcategory,
    subcategoryupdate,
    subcategorydelete,
    subcategoryview
}