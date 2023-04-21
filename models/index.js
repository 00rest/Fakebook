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

//User owns Following and only wishes for this to go both ways...
User.hasMany(Following, {
  foreignKey: 'follower_id',
  onDelete: 'CASCADE'
});

Following.belongsTo( User, {
  foreignKey: 'follower_id'
});





// User.belongsToMany(User, { through: Following, as: 'follower_id'} );

// User.belongsToMany(User, { through: Following, as: 'followee_id'} );





// Following.hasOne(User, {
//   foreignKey: 'user_id'
// });

// User.belongsToMany(Following, {through: Following, as: 'new_followee_id'});




module.exports = { User, Post, Comment, Following };
