const express = require('express');
const router = express.Router();

// Index Route
router.get('/' , (req, res) => {
	res.send('This is the Anakatech API');
});

module.exports = router;
