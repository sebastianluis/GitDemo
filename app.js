const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var db = require('./src/db/index'); // db is pool
const http = require('http');
const index = require('./src/routes/index');
const teacher = require('./src/routes/teacher');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Database connection
app.use(async function(req, res, next) {
await db.initializeDB(); // initialize with creating table if not existis
next();
});

app.use('/', index);
app.use('/api', teacher);

// error handler
///comment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({"status": 500, "error": err.message}); 
});

module.exports = app;
var server = http.createServer(app);
server.listen(4001, function(err){
  if(err) throw err;
  console.log("Server listening at port 4001");
});
