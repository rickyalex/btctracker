var
  express = require('express'),
  router = express.Router();

router.use('/api/btc', require('./btc'));

module.exports = router;