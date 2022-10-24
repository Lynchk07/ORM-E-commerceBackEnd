const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({include:[Category,{model:Tag,through:ProductTag}]})
  .then(productData =>res.json(productData))
  // be sure to include its associated Category and Tag data
  .catch(err => res.json(err))
});

// get one product
router.get('/:id', (req, res) => {
  Product.findOne(
    {
      where:{id:req.params.id},
      include:[
        Category,{model:Tag,through:ProductTag}
      ]
    }
  ).then(productData => res.json(productData))
  .catch(err=>res.json(err))
  // find a single product by its `id`
  
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagId.length) {
        const productTagIdArray = req.body.tagId.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArray);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagId) => res.status(200).json(productTagId))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTag) => {
      // get list of current tag_ids
      const productTagId = productTag.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTag = req.body.tagId
        .filter((tag_id) => !productTagId.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTag
        .filter(({ tag_id }) => !req.body.tagId.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where:{id:req.params.id}
  })
  .then((productData) => res.json(productData)).catch(err => res.json(err))
});

module.exports = router;
