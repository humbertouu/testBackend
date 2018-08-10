let Person = require('../models/person.js');
let crypto = require('../security/encrypt.js');

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
        //console.log(doc);
        if (!doc) {
            return res.status(404).json({
                sucess: false,
                msg: "User not found"});
        }else{
            return res.status(200).json(doc);   
        }
    })
    .catch(err => {
        if (err){
            return res.status(404).json({
                sucess: false,
                msg: "User not found"});
        }
    });
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
    .catch(err => {
        if (err){
            return res.status(404).json({
                sucess: false,
                msg: "User not found"});
        }
    });
}

/*
Creates an user in a DB
*/
module.exports.createUser = function (req, res){
    let email = req.body.email;
    Person.findOne({email : email})
    .then(doc => {
        if (!doc){
            //let person = new Person(req.body);
            let salt = crypto.generateRandomString(16);
            let hashPass = crypto.sha512(req.body.pass, salt);
            let person = new Person ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pass: hashPass,
                Salt: salt
            });
            person.save(function(error){
            if(error){
                console.log(error);
                return res.status(500).json({
                    sucess: false,
                    msg:"Error calling the query"});
            }else{
                res.status(200).json({
                    sucess: true,
                    msg: "Success adding user"});
        }
    });
        }
        else{
            return res.status(404).json({
                sucess: false,
                msg: "That email already exists"});
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
    .catch(err => {
        if (err){
            return res.status(404).json({
                sucess: false,
                msg: "User not found"});
        }
    });
}