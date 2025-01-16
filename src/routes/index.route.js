const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.Controller');
const userController = require('../controllers/user.Controller');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

router.post('/signUp', authController.postSignUp);
router.post('/signIn',authController.postSignIn );

router.post('/submit',userController.postSubmit);
router.get('/submissions',userController.getSubmissions);




module.exports = router;