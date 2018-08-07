const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secureRoutes =  express.Router();

//Controllers
let userController = require('./server/controllers/user-controller');
let authenticateController = require ('./server/controllers/authenticate-controller');

process.env.SECRET_KEY = 'eCe89MlbmVjzDyD';

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/secure-api',secureRoutes);

let config = require('./server/config/config.js');
config.setConfig();

mongoose.connect(process.env.MONGOOSE_CONNECT, {useNewUrlParser: true});

app.get('/api/get-users', userController.getUsers);
app.get('/api/get-user/:id', userController.getUser);
app.post('/api/login', authenticateController.authenticate); 
app.post('/api/create-user', userController.postUser);

//Middleware validation
secureRoutes.use(function(req, res, next){
    let token = req.body.token || req.headers['token'];
    if (token){
        jwt.verify(token, process.env.SECRET_KEY, function (error, decode){
            if (error){
                res.status(500).send('Invalid Token');
            }else{
                next();
            }    
        });
    }
    else{
        res.send("I do not have a token yet");
    }
});
//secureRoutes.post('/create-user', userController.postUser);

app.listen(9000, () => console.log('Listening on port 9000'));

