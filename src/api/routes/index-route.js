// Index Route

const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Hello From Server');
})

module.exports = router;