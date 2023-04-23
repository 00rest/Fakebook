const { Op } = require("sequelize");
const router = require('express').Router();
const { Following } = require('../models');
const withAuth = require('../utils/auth');


//New follower entry gets crated if does not exist
router.post('/follow', withAuth, async (req, res) => {
  try {
    const newFollowing = await Following.findOrCreate({
      attributes: ['user_user_id', 'followee_user_id'],
      where: { [Op.and]: [{ user_user_id: req.session.user_id },  req.body ] },
      defaults: { user_user_id: req.session.user_id, followee_user_id: req.body.followee_user_id}
    });
console.log(newFollowing);
    res.status(200).json(newFollowing);

  } catch (err) { res.status(400).json(err) }
});


module.exports = router;