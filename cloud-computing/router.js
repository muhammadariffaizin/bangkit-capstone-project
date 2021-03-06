const express = require('express');
const router = express.Router();
const isAuthenticated = require('./middleware/Auth');

const {
  authorization,
  oauth2callback,
  revoke
} = require('./middleware/OAuth2Client');

router.get('/authorization', authorization);
router.get('/oauth2callback', oauth2callback);
router.get('/revoke', revoke);

const { 
  login,
  registration,
  getRegisterUserById
} = require('./controller/AuthController');

router.post('/api/login', login);
router.post('/api/registration', registration);
router.get('/api/registration/:id', getRegisterUserById);

const {
  getUser,
  getUserById,
  updateUser,
  deleteUser
} = require('./controller/UserController');

router.get('/api/users', isAuthenticated, getUser);
router.get('/api/users/:id', isAuthenticated, getUserById);
// router.post('/api/users', isAuthenticated, createUser);
router.put('/api/users/:id', isAuthenticated, updateUser);
router.delete('/api/users/:id', isAuthenticated, deleteUser);

const {
  getAllEmotionByUserId,
  getEmotionById,
  createEmotion,
  deleteEmotion
} = require('./controller/UserEmotionController');

router.get('/api/emotion/:id', isAuthenticated, getAllEmotionByUserId);
router.get('/api/emotion/detail/:id', isAuthenticated, getEmotionById);
router.post('/api/emotion', isAuthenticated, createEmotion);
router.delete('/api/emotion/detail/:id', isAuthenticated, deleteEmotion);

router.get('/*', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

module.exports = router;
