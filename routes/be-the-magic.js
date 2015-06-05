var express = require('express');
var router = express.Router();

/* GET magic page. */
router.get('/', function(req, res) {
  res.render('be-the-magic', { title: 'Be The Magic' });
});

module.exports = router;
