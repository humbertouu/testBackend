let crypto = require('crypto');

module.exports.generateRandomString = function (lenght){
    return crypto.randomBytes(Math.ceil(lenght/2))
                .toString('hex')
                .slice(0,lenght);
};

module.exports.sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return value.toString();
    /*return {
        salt:salt,
        passwordHash:value
    };*/
};