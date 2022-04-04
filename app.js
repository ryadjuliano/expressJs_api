
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_ios_test"
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  var insertData = "INSERT INTO tbl_profile(path)VALUES(?)"
  db.query(insertData, [req.body], (err, result) => {
            
            if (err) throw err
            console.log("file uploaded")
            alert('file uploaded')
        })
  res.status(200).json({
    message: 'success!',
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `server is running at http://localhost:${process.env.PORT || 3000}`
  );
});