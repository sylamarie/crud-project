const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to the CRUD Project!');
});

module.exports = router;