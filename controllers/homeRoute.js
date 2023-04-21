const router = require('express').Router();
const { Post, User, Comment, Following } = require('../models');
const withAuth = require('../utils/auth');


router.get('/profile/:id', withAuth, (req, res) => {
  User.findAll({
    attributes: ['user_id', 'user_name', 'profile_picture', 'hometown', 'email', 'birthday', 'bio', 'theme'],
    where: { user_id: req.params.id },
    include: [
      {
        model: Post,
        attributes: ['post_id', 'post_content', 'date_created', 'post_likes'],
        order: ['date_created', 'DESC'],
        include: {
          model: Comment,
          attributes: ['comment_id', 'comment_content', 'user_id', 'date_created'],
          order: ['date_created', 'DESC'],
          include: {
            model: User,
            attributes: ['user_name'],
          }
        }
      },
      {
        model: Following,
        attributes: ['followee_id', 'followee_name', 'date_followed', 'profile_picture'],
        order: ['date_followed', 'DESC'],
      }
    ]
  })
    .then(dbAllData => {
      const allUserData = dbAllData.map(post => post.get({ plain: true }));
      if (allUserData[0].user_id === req.session.user_id) {
        allUserData[0].owner = true;
        allUserData[0].followBtn = false;
        allUserData[0].posts.forEach((post) => {
          post.comments.forEach((comment) => {
            comment.comment_owner = true
          })
        });

      } else {
        allUserData[0].followBtn = true;
        allUserData[0].posts.forEach((post) => {
          post.comments.forEach((comment) => {
            if (comment.user_id === req.session.user_id) {
              comment.comment_owner = true;
            };
          })
        });
      };
if(allUserData[0].user_id){
      res.render('profile', { ...allUserData[0], logged_in: req.session.logged_in, userInfo: JSON.stringify(allUserData[0]) });
} 
    })
    .catch(err => {
      console.log(err);
      res.render('error', {error: 'no such user'})
      // res.status(500).json(err);
    });

});


router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect(`/profile/${req.session.user_id}`);
    return;
  }

  res.render('login');
});

router.get('/profile', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect(`/profile/${req.session.user_id}`);
    return;
  }

  res.render('login');
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect(`/profile/${req.session.user_id}`);
    return;
  }

  res.render('login');
});

module.exports = router;

