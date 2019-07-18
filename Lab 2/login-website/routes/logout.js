const express = require('express')
const router = express.Router()

// Log a user out
router.get('/', (req, res) => {
  // req.logout()
  req.session.destroy();
  user = null
  res.redirect('/')
})

module.exports = router
