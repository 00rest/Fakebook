const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Gets comments for each post (WORKING)
router.get('/', (req, res) => {
  Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// New comment (WORKING)
router.post('/comments2', withAuth, async (req, res) => {
  const targetObj = {...req.body, user_id: req.session.user_id };

  try {
    const newComment = await Comment.create(targetObj);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Deletes Post comment (WORKING)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Comment.destroy({
      where: { comment_id: req.params.id },
    });

    if (!postData) {
      res.status(404).json({ message: 'No comments found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;