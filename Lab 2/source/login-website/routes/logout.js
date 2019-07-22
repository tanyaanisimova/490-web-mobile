const express = require('express')
const router = express.Router()

// Log a user out
router.get('/', (req, res) => {
  req.session.destroy(); // remove session
  user = null //remove user information
  res.redirect('/')
})

module.exports = router
