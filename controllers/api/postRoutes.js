const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//New post gets crated
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({...req.body, user_id: req.session.user_id, });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

 

//Post gets deleted
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        post_id: req.params.id
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// POST to add likes
router.post('/like', withAuth, (req, res) => {
  Post.increment('post_likes', {where: { post_id: req.body.post_id }})
    .then(() => {
      return Post.findOne({ where: { post_id: req.body.post_id } })
      })
    .then((newLike) => {
      res.json(newLike);
})
    .catch((err) => {
      res.json(err);
    });
});

 // POST to decrement likes
router.post('/dislike', withAuth, (req, res) => {
   Post.decrement('post_likes', {where: { post_id: req.body.post_id }})
    .then(() => {
      return Post.findOne({ where: { post_id: req.body.post_id } })
      })
    .then((newLike) => {
      res.json(newLike);
})
    .catch((err) => {
      res.json(err);
    });
});



module.exports = router;
