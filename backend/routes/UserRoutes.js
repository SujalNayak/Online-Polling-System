const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/addUser', UserController.addUser);
router.get('/getUsers', UserController.getUsers);
router.post('/login', UserController.login);
router.post('/polling', UserController.polling);
router.get('/results', UserController.results);

module.exports = router;