const router = require('express').Router();
const { Category,Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({include:[Product]})
  .then(categoryDataBase => res.json(categoryDataBase)).catch(err => res.json(err))
  // be sure to include its associated Products

  // try {
  //   //     const userData = await User.update(req.body, {
  //   //       where: {
  //   //         id: req.params.id,
  //   //       },
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where:{id:req.params.id},
    include:[Product]
  }).then(categoryDataBase => res.json(categoryDataBase)).catch(err => res.json(err))
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(categoryDataBase => res.json(categoryDataBase))
  .catch(err=> res.json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(res.body, {
    where:{
      id:req.params.id
    }
  }).then(categoryDataBase => res.json(categoryDataBase))
  .catch(err => res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(categoryDataBase => res.json(categoryDataBase))
  .catch(err => res.json(err))
});

module.exports = router;
// const router = require('express').Router();
// const User = require('../../models/User');

// // GET a user
// router.get('/:id', async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id);
//     if (!userData) {
//       res.status(404).json({ message: 'No user with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // UPDATE a user
// router.put('/:id', async (req, res) => {
//   
//     });
//     if (!userData[0]) {
//       res.status(404).json({ message: 'No user with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // DELETE a user
// router.delete('/:id', async (req, res) => {
//   try {
//     const userData = await User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData) {
//       res.status(404).json({ message: 'No user with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;