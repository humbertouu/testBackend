let Person = require('../models/person.js');

module.exports.getUsers = function (req, res) {
    Person.find({}, function(error, people){
        if(error){
            return res.status(500).send("Error calling the query");
        }else{
            res.json({data: people});
        }
    });
}

module.exports.getUser = function (req, res) {
    Person.findById(req.params.id)
    .then(doc => {
        if (!doc) {
            return res.status(404).send("User not found")
        }else{
            return res.status(200).json(doc);   
        }
    })
    .catch(error => next(error));
}

module.exports.postUser = function (req, res){
    let person = new Person(req.body);
    person.save(function(error){
        if(error){
            return res.status(500).send("Error calling the query");
        }else{
            res.status(200).send("Success adding user");
        }
    });
}
