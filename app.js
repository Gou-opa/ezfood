var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var bf_gateway = require('./business_flow/BF_gateway');
const busboy = require('connect-busboy');   




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());
app.get('/upload' , function(req, res){
	res.render('form');
})
app.post('/upload', function(req, res) {
		
		console.log("anh upload ten la: "+req.files.foodimage.name);
		console.log("ten la: "+req.body);
		if (Object.keys(req.files).length == 0) {
			return res.status(400).send('No files were uploaded.');
		}
		else{
			console.log("anh upload ten la: "+req.files.foodimage.name);
			// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
			let image = req.files.foodimage;
			uploadPath = __dirname + '/React_front/public/images/' + image.name;
			// Use the mv() method to place the file somewhere on your server
			image.mv(uploadPath, function(err) {
				if (err){
					console.log("loi mv " + err); 
					res.status(509).send(err);
				}
				else res.status(200).json({"is":"ok"});
			});
		}

});
app.get('/', function(req,res){
	res.json({});
});











app.use('/',
	require('./routes/index'))
.use('/storekeeper', 
	require('./routes/storekeeper'))
.use('/customer', 
	require('./routes/customer'))
.use('/waiter', 
	require('./routes/waiter'))
.use('/manager', 
	require('./routes/manager'))
.use('/admin', 
	require('./routes/admin'))
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
