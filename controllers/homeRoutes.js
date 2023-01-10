const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', async (req, res) => {

  try {
    res.render('dashboard', {
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {

  try {
    res.render('login', {
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

router.get('/register', async (req, res) => {  

  try {
    res.render('register', {
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attribute: ['username']
          },
        ],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;