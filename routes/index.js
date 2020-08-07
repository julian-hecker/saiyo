var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res) => {
  res.render()
})

'http://localhost:3000/'

module.exports = router;
