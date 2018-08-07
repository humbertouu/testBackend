const moongose = require('mongoose');

module.exports = moongose.model('Person', {
    firstName: 'String',
    lastName: 'String',
    email: 'String',
    pass: 'String',
    Salt: 'String'
})