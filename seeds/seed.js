const sequelize = require('../config/connection');
const { User, Post, Comment, Following } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const followingData = require('./followingData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {await Post.create({...post})};
  for (const comment of commentData) {await Comment.create({...comment})};
  for (const following of followingData) {await Following.create({...following})};

  process.exit(0);
};

seedDatabase();
