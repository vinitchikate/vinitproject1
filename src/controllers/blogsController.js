const authorModel = require('../models/authorModel');
const blogModel = require('../models/blogModel');
const moment = require("moment");



const postBlogs = async function (req, res) {
    try {
        if (!req.body.authorId) {
            return res.status(400).send({ status: false, msg: "First Add Author-Id In Body" });
        }
        // Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
        let authorid = await authorModel.findById(req.body.authorId);
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

// ****************GET BLOGS API********************//
const getBlogs = async function (req, res) {
    try {
        let data = req.query
        //Returns all blogs in the collection that aren't deleted and are published
        let blogs = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, data] })

        if (blogs.length <= 0) {
            return res.status(400).send({ status: false, msg: 'data is not found' })
        }

        return res.status(200).send({ status: true, data: blogs })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.getBlogs = getBlogs


// ****************PUT API********************//
const updateblogs = async function (req, res) {
    let data = req.body
    let blogId = req.params.blogId;
    let blog = await blogModel.findById(blogId);
    let dt = moment().format('MMMM Do YYYY, h:mm:ss a');


    if (blog) {
        if (blog.isDeleted == false) {
            if (blog.isPublished == true) {
                let updatedate = await blogModel.findOneAndUpdate({ _id: blogId }, { new: true }, { $set: { publishedAt: dt } })

            }

        }
        let updateblogs = await blogModel.findOneAndUpdate({ _id: blogId }, { ...data }, { new: true })
        return res.status(200).send({ status: true, data: updateblogs })
    }
};

// *****************DeleteApi*************************//

const deleteBlogs = async function (req, res) {
    try {

        let blogId = req.params.blogId;
        // Check if the blogId exists
        if (!blogId) {
            return res.status(400).send({ msg: "Enter Blog-Id In Your Params" });
        }

        let cid = await blogModel.findById(blogId);
        let checkid = cid.isDeleted;
        if (cid) {
            if (checkid == false) {
                // mark it deleted
                let update = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true });
                // return an HTTP status 200 without any response body.
                return res.status(200).send();
            }
            else {
                // If the blog document doesn't exist then return an HTTP status of 404
                return res.status(400).send({ status: false, msg: "Blog Is Deleted" });
            }
        } else {
            return res.status(404).send({ msg: "Plz Enter Valid Blog-Id" });
        }
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
}
module.exports.deleteBlogs = deleteBlogs;

// ********************DeleteByQuery***************************//

const queryDeleted = async function (req, res) {
    try {
        let data = req.query;
        console.log(data)
        if (Object.values(data) <= 0)
            return res.status(400).send({ status: false, msg: "Input Missing" });

        let deleted = await blogModel.updateMany({ $and: [data, { isPublished: false }] }, { isDeleted: true, deleteAt: Date.now() }, { new: true });
        console.log(deleted)
        
        if (deleted.modifiedCount == 0) {

            return res.status(404).send({ status: false, msg: "Data cannot be modified" });
        }
        return res.status(200).send({ status: true, data: deleted });
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


module.exports.queryDeleted = queryDeleted

module.exports.updateblogs = updateblogs
