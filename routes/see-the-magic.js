var express = require('express');
var router = express.Router();

/* GET magic page. */
router.get('/', function(req, res) {
  res.render('see-the-magic', { title: 'See The Magic' });
});

module.exports = router;
