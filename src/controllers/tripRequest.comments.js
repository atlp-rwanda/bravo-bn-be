import db from '../database/models/index';
import jwt from 'jsonwebtoken';
import Email from '../utils/email';
import emitter from '../utils/eventEmitter';
import createNotification from '../services/notification.service';
const Comment = db['Comment'];
const users = db['users'];
const tripRequests = db['tripRequest'];

export const commentOnRequests = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const userId = req.user.id;
    const user = await users.findByPk(userId);
    const tripRequestId = req.params.tripRequestId;
    let tripRequest = await tripRequests.findOne({
      where: { requesterId: userId, id: tripRequestId },
    });

    if (user.role === 'manager') {
      tripRequest = await tripRequests.findByPk(tripRequestId);
    }

    if (!tripRequest) {
      return res.status(400).json({
        error: 'The trip request you are trying to comment on does not exist!',
      });
    }

    console.log(userId !== tripRequest.requesterId || user.role !== 'manager');

    if (userId !== tripRequest.requesterId && user.role !== 'manager') {
      return res
        .status(403)
        .json({ error: 'You are Not Authorized to comment on this request' });
    }

    const createComment = await Comment.create({
      userId: userId,
      tripRequestId: tripRequestId,
      comment,
    });

    const comments = await Comment.findAndCountAll({
      where: { tripRequestId },
    });

    if (createComment) {
      const url = `${req.protocol}://${req.get('host')}/api/v1/user/trip/${
        tripRequest.id
      }/comments`;

      const manager = await users.findOne({ where: { role: 'manager' } });
      await new Email(manager, url).commentOnRequest();
      await new Email(user, url).commentOnRequest();
      createNotification(
        user.id,
        'Commented on request.',
        'A comment have been added!',
        url,
      );
      emitter.emit('notification', '');
      return res.status(201).json({
        message: 'comment successfully added',
        comment: comment,
        commentsCount: comments.count,
        tripRequest: tripRequest,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const tripRequestId = req.params.tripRequestId;
    const tripRequest = await tripRequests.findByPk(tripRequestId);

    if (!tripRequest) {
      return res
        .status(400)
        .json({ error: 'That trip request does not exist!' });
    }

    const comments = await Comment.findAndCountAll({
      where: { tripRequestId: tripRequestId },
    });

    if (comments) {
      return res.status(200).json({
        message: 'Comments fetched successfully',
        comments: comments,
        travelRequest: tripRequest,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  const user = await users.findByPk(userId);

  const commentId = req.params.id;
  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    return res.status(400).json({
      error: 'The comment you are trying to delete does not exist!',
    });
  }

  if (comment.userId === userId || user.role === 'super admin') {
    await Comment.destroy({
      where: { id: commentId },
    });
    return res.status(200).json({ message: 'Comment deleted successfully!' });
  } else {
    return res
      .status(403)
      .json({ error: 'You are not authorized to delete this comment' });
  }
};
