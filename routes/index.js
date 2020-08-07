var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'Express' });
});

router.get('/form', (req, res) => {
  res.render('form')
})

'http://localhost:3000/'

module.exports = router;
