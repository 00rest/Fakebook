const { Op } = require("sequelize");
const router = require('express').Router();
const { Following } = require('../models');
const withAuth = require('../utils/auth');


//New follower entry gets crated if does not exist
router.post('/follow', withAuth, async (req, res) => {
  try {
    const newFollowing = await Following.findOrCreate({
      attributes: ['follower_id', 'followee_id', 'followee_name', 'profile_picture'],
      where: { [Op.and]: [{ follower_id: req.session.user_id },  req.body ] },
      defaults: {
        follower_id: req.session.user_id,
        followee_id: req.body.followee_id,
        followee_name: req.body.followee_name,
        profile_picture: req.body.profile_picture }
    });

    res.status(200).json(newFollowing);

  } catch (err) { res.status(400).json(err) }
});


module.exports = router;