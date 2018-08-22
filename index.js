var express = require('express')
var bodyParser = require('body-parser')
var mongoDb = require('mongodb')

var userController = require('./controllers/userController')

var PROJECTS_COLLECTION = 'projects'
var PROUSER_COLLECTION = 'prouser'
var SPRINTS_COLLECTION = 'sprints'
var BACKLOG_ITEMS_COLLECTION = 'backlogItems'
var TASKS_COLLECTION = 'tasks'

var app = express()
app.use(bodyParser.json())

var db;

var errorHandler = function(res, reason, message, code) {
    console.log('ERROR: ' + reason)
    res.status(code || 500).json({ 'error': message })
}

mongoDb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', function(err, client) {
    if(err) {
        console.log(err)
        process.exit(1)
    }

    db = client.db();
    console.log('Database connection ready')

    var server = app.listen(process.env.PORT || 8080, function() {
        var port = server.address().port
        console.log('App now running on port' + port)
    })

    userController.setup(app, db, errorHandler)
})
