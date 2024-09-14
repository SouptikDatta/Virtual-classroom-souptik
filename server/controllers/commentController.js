const Comment = require('../models/Comment');

// Add a comment to a lecture
const addComment = async (req, res) => {
  const { content, parentComment } = req.body;
  const { lectureId } = req.params;

  const newComment = await Comment.create({
    content,
    user: req.user._id,
    lectureId,
    parentComment
  });

  res.status(201).json(newComment);
};

// Get comments for a lecture
const getComments = async (req, res) => {
  const { lectureId } = req.params;

  const comments = await Comment.find({ lectureId }).populate('user').populate('replies');
  res.json(comments);
};

module.exports = { addComment, getComments };
