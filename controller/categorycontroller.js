const categorytbl = require('../model/category');

const category = async (req, res) => {
    try {
        const { category } = req.body;
        if (category != "") {
            let categorydata = await categorytbl.findOne({ category: category.toLowerCase() });
            if (categorydata) {
                return res.status(400).json({ "message": "category is same" });
            }
            else {
                let data = await categorytbl.create({
                    category: category.toLowerCase()
                })
                if (data) {
                    return res.json({ messege: "category is added", status: 1 })
                }
                else {
                    return res.json({ messege: "category is not added", status: 0 })
                }
            }

        }
        else {
            return res.json({ messege: "category is can't empty", status: 0 })
        }

    }
    catch (err) {
        console.log(err);
    }
}

const categoryupdate = async (req, res) => {
    try {
        const { id, category } = req.body;
        let data = await categorytbl.findByIdAndUpdate(id, {
            category: category
        });
        if (data) {
            return res.json({ messege: "category is updated", status: 1 });
        }
        else {
            return res.json({ messege: "category is not updated", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}

const categorydelete = async (req, res) => {
    try {
        const id = req.body.id;
        let data = await categorytbl.findByIdAndDelete(id);
        if (data) {
            return res.json({ messege: "category is deleted", status: 1 });
        }
        else {
            return res.json({ messege: "category is not deleted", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}

const categoryview = async (req, res) => {
    try {
        let data = await categorytbl.find({});
        if (data) {
            return res.json({ category: data, status: 1 });
        }
        else {
            return res.json({ messege: "category is no fathed", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}



module.exports = {
    category,
    categorydelete,
    categoryupdate,
    categoryview
}