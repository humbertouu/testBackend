const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secureRoutes =  express.Router();

//Controllers
let userController = require('./server/controllers/user-controller');
let authenticateController = require ('./server/controllers/authenticate-controller');

//Token secret key
process.env.SECRET_KEY = 'eCe89MlbmVjzDyD';

//
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/secure-api',secureRoutes);

//Mongo connection
let config = require('./server/config/config.js');
config.setConfig();
mongoose.connect(process.env.MONGOOSE_CONNECT, {useNewUrlParser: true});

//Middleware validation for secure endpoints
secureRoutes.use(function(req, res, next){
    let token = req.body.token || req.headers['token'];
    if (token){
        jwt.verify(token, process.env.SECRET_KEY, function (error, decode){
            if (error){
                res.status(500).json({
                    sucess: false,
                    msg: "Invalid Token"
                });
            }else{
                next();
            }    
        });
    }
    else{
        res.status(404).json({
            sucess: false,
            msg: "I do not have a token yet"
        });
    }
});

//GET Methods
app.get('/api/get-users', userController.getUsers);
app.get('/api/get-user/:id', userController.getUser);

//POST Methods
app.post('/api/login', authenticateController.authenticate); 

//DELETE Methods
app.delete('/api/delete-user/:id', userController.deleteUser);

//Secure Rutes
secureRoutes.post('/create-user', userController.postUser);
secureRoutes.post('/get-user-email/', userController.getUserByEmail);

app.listen(9000, () => console.log('Listening on port 9000'));

