const authorModel = require('../models/authorModel');
const blogModel = require('../models/blogModel');
const moment = require("moment");



const postBlogs = async function (req, res) {
    try {
        // Get authorId in request body only.
        if (!req.body.author) {
            return res.status(400).send({ status: false, msg: "First Add Author-Id In Body" });
        }

        // Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
        let authorid = await authorModel.findById(req.body.author);
        if (!authorid) {
            return res.status(400).send({ status: false, msg: "Plz Enter Valid Author Id" });
        }

        // Create a blog document from request body.
        let createblogs = await blogModel.create(req.body);
        // Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object
        res.status(201).send({ createblogs });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
module.exports.postBlogs = postBlogs;


const getBlogs = async function (req, res) {
    try {
        let authorid = req.query.authorId;
        let byCategory = req.query.category;
        let tags = req.query.tags;
        let subcategory = req.query.subcategory;

        let allblogs = await blogModel.find({ isDeleted: false, isPublished: true, $or: [{ authorId: authorid }, { category: byCategory }, { tags: tags }, { subcategory: subcategory }] });

        return res.status(200).send({ status: true, data: allblogs });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports.getBlogs = getBlogs


// ****************UPDATE BLOGS API********************//
const updateblogs = async function (req, res) {
    let data = req.body
    let blogId = req.params.blogId;
    let blog = await blogModel.findById(blogId);
    let dt = moment().format('MMMM Do YYYY, h:mm:ss a');


    if (blog) {
        if (blog.isDeleted == false) {
            if (blog.isPublished == true) {
                let updatedate = await blogModel.findOneAndUpdate({ _id: blogId }, { new: true }, { $set: { publishedAt: dt } })
                  return res.status(200).send({status:true,data:updatedate})
            }
            let updateblogs = await blogModel.findOneAndUpdate({ _id: blogId }, { ...data }, { new: true })
            return res.status(200).send({ status: true, data: updateblogs })
        }
    }
};
module.exports.updateblogs = updateblogs


const deleteBlogs = async function (req, res) {
}
module.exports.deleteBlogs = deleteBlogs;