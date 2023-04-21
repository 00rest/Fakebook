const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes = require('./homeRoute');
const followingRoutes = require('./followingRoute');

router.use('/', followingRoutes);
router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;