var passwordHash = require('password-hash')

var USERS_COLLECTION = 'users'

var setup = function(app, db, errorHandler) {
    app.get('/api/users', function(req, res) {
        db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
            if(err) {
                errorHandler(res, err.message, 'Failed to get users')
            } else {
                res.status(200).json(docs)
            }
        })
    })

    app.post('/api/users', function(req, res) {
        if(!(req.body.name && req.body.password)) {
            errorHandler(res, 'Invalid user input', 'Must provide a name and a password', 400)
        }

        var user = {}

        user.name = req.body.name
        user.password = passwordHash.generate(req.body.password)

        db.collection(USERS_COLLECTION).insertOne(user, function(err, doc) {
            if(err) {
                errorHandler(res, err.message, 'Failed to create a new contact')
            } else {
                res.status(201).json(doc)
            }
        })
    })
}

module.exports = { setup }
