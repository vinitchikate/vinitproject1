const authorModel = require('../models/authorModel');
const validateAuthor = async function(req,res,next) {
    try{
        let fname = req.body.firstname
        let lname = req.body.lastname
        let title = req.body.title
        let email = req.body.email
        let password =req.body.password
     
        if(Object.values(fname).length <= 0){
             return res.status(400).send("The firstname  is required");
        }

        if(Object.values(lname).length <= 0){
           return res.status(400).send("The lastname  is required");
        }
        if(Object.values(title).length <= 0){
            return res.status(400).send("The title  is required");
        }
        if(Object.values(email).length <= 0){
            return res.status(400).send("The email is required and unique");
        }
        if(Object.values(password).length <= 0){
            return res.status(400).send("The password  is required");
        }else{
            next()
        }
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}

// blogmodel create require
const validateBlog = async function(req,res,next){
    try{
        let data =req.body
        const {title,body,authorId,category} =data
        
        if(Object.values(title).length <= 0){
            return res.status(400).send("The title  is required");
       }

       if(Object.values(body).length <= 0){
          return res.status(400).send("The body  is required");
       }
       if(Object.values(authorId).length <= 0){
           return res.status(400).send("The authorId is required");
       }
       // check author id vailid or not
        let authorid = await authorModel.findById(authorId)
        if (!authorid) {
        return res.status(404).send('the author id is not valid')
    }
       if(Object.values(category).length <= 0){
           return res.status(400).send("The category  is required");
       }else{
           next()
       }
     }
    catch(err){
    return res.status(500).send({status:false,msg:err.message})
    }
}

module.exports.validateBlog = validateBlog
module.exports.validateAuthor = validateAuthor