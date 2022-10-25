const router = require('express').Router();
const { TableHints } = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({include:[{model:Product,through:ProductTag}]})
  .then(tagDataBase => res.json(tagDataBase))
  
});

router.get('/:id', (req,res) => {
  // find a single tag by its `id`
  Tag.findOne({include:[{model:Product,through: ProductTag}],
    where:{id:req.params.id}}).
     then(tagDataBase => res.json(tagDataBase))
  
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(tagDataBase => res.json(tagDataBase))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{where:{id:req.params.id}}).then(tagDataBase => res.json(tagDataBase))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where:{id:req.params.id}}).then(tagDataBase=>res.json(tagDataBase))
});

module.exports = router;
