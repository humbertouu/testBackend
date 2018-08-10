let Person = require('../models/person.js');

/*
Get all users
*/
module.exports.getUsers = function (req, res) {
    Person.find({}, function(error, people){
        if(error){
            return res.status(500).send("Error calling the query");
        }else{
            res.json({data: people});
        }
    });
}

/*
Get an user by specifing the ID
*/
module.exports.getUser = function (req, res) {
    Person.findById(req.params.id)
    .then(doc => {
        if (!doc) {
            return res.status(404).json({
                sucess: false,
                msg: "User not found"});
        }else{
            return res.status(200).json(doc);   
        }
    })
    .catch(error => next(error));
}

/*
Get user specified by the email
*/
module.exports.getUserByEmail = function (req, res) {
    let email = req.body.email;
    Person.findOne({email : email})
    .then(doc => {
        if (!doc) {
            return res.status(404).json({
                sucess : false, 
                msg: "User not found"});
        }else{
            //return res.status(200).json(doc);
            res.json(doc);
        }
    })
    .catch(error => next(error));   
}

/*
Creates an user in a DB
*/
module.exports.postUser = function (req, res){
    let person = new Person(req.body);
    person.save(function(error){
        if(error){
            return res.status(500).json({
                sucess: false,
                msg: "Error calling the query"});
        }else{
            res.status(200).json({
                sucess: true,
                msg: "Success adding user"});
        }
    });
}

/*
Delete user by ID
*/
module.exports.deleteUser = function (req, res){
    Person.findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
        if (!doc) {
            return res.status(404).json({
                sucess: false,
                msg: "User not found"});
        }else{
            return res.status(200).json({
                sucess: true,
                msg: "User deleted correctly"});
        }
    })
    .catch(error => next(error));

}