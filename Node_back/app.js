var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
//var bf_gateway = require('./business_flow/BF_gateway');
const busboy = require('connect-busboy');   
const fs = require('fs');
var userpool = require('./database/userpool_schema');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(busboy({
    highWaterMark: 10 * 1024 * 1024, // Set 2MiB buffer
}));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());



app.post('/upload', function(req, res) {
	console.log("app.js said anh upload ten la: "+req.files.foodimage.name);
	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were uploaded.');
	}
	else{
		console.log("anh upload ten la: "+req.files.foodimage.name);
		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		var image = req.files.foodimage;
		uploadPath = __dirname + '/../React_front/public/images/dish/' + image.name;
		// Use the mv() method to place the file somewhere on your server
		image.mv(uploadPath, function(err) {
			if (err){
				console.log("loi mv " + err); 
				res.status(509).send(err);
			}
			else {
				fs.copyFile(uploadPath, `${__dirname}/../React_front/build/images/dish/${image.name}`, (err) => {
					if (err){
						console.log("loi cp " + err); 
						res.status(509).send(err);
					}
					else res.status(200).json({"is":"ok"});
				});
			}
		});
	}
});

app.post('/change-user-avatar' , function(req, res){
	var userid = req.body.uid;
	var avatarfilename = req.body.avatar;
	console.log("change avatar for " + userid);
	userpool.updateOne({"_id": userid}, {$set:{ avatar: `/images/avatar/${avatarfilename}`}}, function(err, out){
		if(err) {
			console.log("change avatar failed");
			res.status(500).json({change: false});
		}else {
			console.log("change avatar success");
			res.status(200).json({change: true});
		}
	});
});
app.post('/change-avatar', function(req, res) {
	console.log("app.js said avatar upload ten la: "+req.files.avatar.name);
	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were uploaded.');
	}
	else{
		console.log("anh upload ten la: "+req.files.avatar.name);
		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		var image = req.files.avatar;
		uploadPath = __dirname + '/../React_front/public/images/avatar/' + image.name;
		// Use the mv() method to place the file somewhere on your server
		image.mv(uploadPath, function(err) {
			if (err){
				console.log("loi mv " + err); 
				res.status(509).send(err);
			}
			else {
				fs.copyFile(uploadPath, `${__dirname}/../React_front/build/images/avatar/${image.name}`, (err) => {
					if (err){
						console.log("loi cp " + err); 
						res.status(509).send(err);
					}
					else res.status(200).json({"is":"ok"});
				});
			}
		});
	}
});
app.get('/', function(req,res){
	res.json({});
});











app.use('/',
	require('./routes/index'))
.use('/storage', 
	require('./routes/storage'))
.use('/waiter', 
	require('./routes/waiter'))
.use('/manager', 
	require('./routes/manager'))
.use('/images',
	require('./routes/images'))
.use('*', 
	require('./routes/else'));

  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


















module.exports = app;
