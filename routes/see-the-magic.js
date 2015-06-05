var express = require('express');
var router = express.Router();

/* GET magic page. */
router.get('/', function(req, res) {
  // render the page called "see-the-magic.hbs" with the
  // title of "See The Magic
  res.render('see-the-magic', { title: 'See The Magic' });
});

module.exports = router;
