const authorModel = require("../models/authorModel");



const createauthor = async function (req, res) {
    try {
        let data = req.body;
        let savedData = await authorModel.create(data);
        res.status(201).send({ msg: savedData });
    }
    catch (error) {
        res.send({ msg: error.message });
        console.log(error.message);
    }
};
module.exports.createauthor = createauthor;