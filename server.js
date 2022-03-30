const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index');
});

const port = 8080;

app.listen(port, err => {
  if (err) console.error(err);
  console.log('Server started on ' + port);
});
