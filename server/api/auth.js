const router = require('express').Router();
const { Challenge, Users } = require('../../database/');

// router.get('/login', (req, res, next) => {
//   Users.findOne({
//     where: {
//       email: req.body.email,
//       // password: req.body.password,
//     },
//   })
//     .then(user => {
//       if (user) {
//         req.session.userId = user.id;
//         res.json(user);
//       } else {
//         const err = new Error('Incorrect email or password!');
//         err.status = 401;
//         next(err);
//       }
//     })
//     .catch(next);
// });

router.put('/login', async (req, res, next) => {
  try {
    const foundUser = await Users.findOne({
      where: {
        username: req.body.username,
        // password: req.body.password,
      },
    });
    if (foundUser) {
      if (!foundUser.correctPassword(req.body.password)) {
        res.sendStatus(404);
      } else {
        // req.login(foundUser, err => (err ? next(err) : res.json(foundUser)));
        res.json(foundUser);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// auth routes go below!
// router.put('/login', async (req, res, next) => {
//   try {
//     console.log('req-body ', req.body);
//     const user = await Users.findOne({
//       where: {
//         email: req.body.email,
//         password: req.body.password,
//       },
//     });
//     if (user) {
//       req.session.userId = user.id;
//       res.json(user);
//     } else {
//       const err = new Error('Incorrect email or password!');
//       res.send(err).status(401);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/login', async (req, res, next) => {
//   try {
//     res.sendStatus(200);
//   } catch (error) {
//     res.sendStatus(404);
//   }
// });

module.exports = router;
