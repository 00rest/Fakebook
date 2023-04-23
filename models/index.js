const User = require('./User');
const Post = require('./Post');
const Comment = require('./comment');
const Following = require('./Following');

//User owns Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});
//----------------------

//Posts own comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});
//----------------------

//User also owns comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
//----------------------

//User connected to User through Following
User.belongsToMany(User, { as: 'Followees',  through: Following });
//----------------------


module.exports = { User, Post, Comment, Following };
