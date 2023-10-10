const { log } = require('console');
const jwt = require('jsonwebtoken')
const registertbl = require('../model/form');
const { rootCertificates } = require('tls');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let data = await registertbl.findOne({ email: email }); 
        if (!data || data.password != password) {
            return res.json({ messege: "Email and Password is wrong", status: 0 })
        }
        const token = jwt.sign({ payload: data }, 'logindata', { expiresIn: '1hr' });
        return res.json({ token: token });
    }
    catch (err) {
        console.log(err);
    }
}

const index = (req, res) => {
    res.json({ "message": "done" })
}

const register = async (req, res) => {
    try {
        const { name, email, password ,role } = req.body;
        let data = await registertbl.create({
            name: name,
            email: email,
            password: password,
            role:role
        });
        if (data) {
            return res.json({ messege: "Data is added", status: 200}) 
        }
        else {
            return res.json({ messege: "Data is not added", status: 400 }) 
        }
    }
    catch (err) {
        console.log(err);
    }
}

const update = async (req, res) => {
    try {
        const { id, name, email, password ,role} = req.body;
        let data = await registertbl.findByIdAndUpdate(id, {
            name: name,
            email: email,
            password: password,
            role:role
        });
        if (data) {
            return res.json({ messege: "Data is updated", status: 200}) 
        }
        else {
            return res.json({ messege: "Data is not updated", status: 400}) 
        }
    }
    catch (err) {
        console.log(err);
    }
}

const deletedata = async (req, res) => {
    try {
        const id = req.body.id;
        let data = await registertbl.findByIdAndDelete(id);
        if (data) {
            return res.json({ messege: "Data is deleted", status: 200}) 
        }
        else {
            return res.json({ messege: "Data is not deleted", status: 400}) 
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    login,
    index,
    register,
    update,
    deletedata
}  