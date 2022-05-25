
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname,'./public/uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
})

const upload = multer({ storage: storage })

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));



app.get('/', function (req, res) {
  
  res.sendFile(path.join(__dirname,'./public/GetMethodForm.html'));
})

app.get('/postform', function (req, res) {
  
  res.sendFile(path.join(__dirname,'./public/PostMethodForm.html'));
})

app.get('/fileupload', function (req, res) {
  
  res.sendFile(path.join(__dirname,'./public/fileUploadForm.html'));
})

app.get('/getdata', function (req, res) {
  response = {
     first_name:req.query.first_name,
     last_name:req.query.last_name
  };
  res.end(JSON.stringify(response));
})

app.get('/multiFile', function (req, res) {
  res.sendFile(path.join(__dirname,'./public/multyFileUploadForm.html'));

})

app.post('/postData', function (req, res) {
  response = {
     first_name:req.body.first_name,
     last_name:req.body.last_name
  };
  res.end(JSON.stringify(response));
})

app.post('/uploadfile', upload.single('file'), function (req, res) {
  console.log(req.file, req.body)
  res.send('file uploaded')
});

app.post('/multifiles', upload.array('multi-files',3), function (req, res) {
    console.log(req.files);
  res.send('file uploaded')
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})