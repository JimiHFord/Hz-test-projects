var express = require('express');
var router = express.Router();

/* GET magic page. */
router.get('/', function(req, res) {
  // render the page called "be-the-magic.hbs" with the
  // title of "Be The Magic"
  res.render('be-the-magic', { title: 'Be The Magic' });
});

module.exports = router;
