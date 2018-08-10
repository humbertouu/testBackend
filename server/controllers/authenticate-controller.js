let jwt = require('jsonwebtoken');
let Person = require('../models/person.js');

module.exports.authenticate = function (req, res){
    let user = {
        username : req.body.email,
        pass : req.body.pass
    }
    Person.findOne({email: user.username, pass: user.pass})
    .then(doc => {
        if (!doc) {
            return res.status(404).json({
                sucess : false, 
                msg: "User not found"});
        }else{
            //return res.status(200).json(doc);
            let token = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: 4000 //66 minutos con 66 segundos
            });
            res.json({
                sucess: true,
                token: token,
            });   
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