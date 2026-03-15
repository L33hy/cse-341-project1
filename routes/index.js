const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to my API');
});

router.use('/users', require('./users'));

module.exports = router;