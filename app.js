const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = Promise
const keys = require('./config/keys')
const passport = require('passport')
const cookieSession = require('cookie-session')

// Connect to Database
mongoose.connect(keys.mongodb.url, {useMongoClient: true})
let db = mongoose.connection

// Check connection
db.once('open', () => {
	console.log('Connected to MongoDB')
})

// Check for DB errors
db.on('error', (err) => {
	console.log(err)
})

// Setting Headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key")
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
		res.header("Access-Control-Allow-Credentials", true)
    next()
})

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }))
// Parse application/json
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.json())

// Init Passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// Route files
let index = require('./routes/index')
app.use('/api', index)
let users = require('./routes/users')
app.use('/api/users', users)
let employees = require('./routes/employees')
app.use('/api/employees', employees)
let departments = require('./routes/departments')
app.use('/api/departments', departments)

// Init Server Port
const PORT = process.env.PORT || 3000

// Start server
app.listen(PORT, () => {
	console.log('Server started on port '+ PORT)
})
