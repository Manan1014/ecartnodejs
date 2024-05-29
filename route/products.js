const Product = require('../model/product');
const Category = require('../model/catagory')
const express = require('express');
const bodyparser = require('body-parser');

const router = express.Router();
router.use(bodyparser.json());
router.get('/products', async(req, res) => {
    try {
        const ProductList = await Product.find().populate('category');
        res.status(200).json({ success: true, categories: ProductList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.get('/products/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        res.status(200).json({ success: true, categories: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'could not find this product', message: req.params.id });
    }
});

router.put('/products/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, {
                name: req.body.name,
                description: req.body.description,
                richdescription: req.body.richdescription,
                image: req.body.image,
                images: req.body.images,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countinStock: req.body.countinStock,
                rating: req.body.rating,
                isfeatured: req.body.isfeatured,
            }, { new: true }
        )

        if (!product) {
            return res.status(404).send("No category with that id")
        } else {
            return res.status(200).send(product)
        }
    } catch (err) {
        console.log("sorry! we can not update it");
        console.log(err);
    }
})

router.post('/products', async(req, res) => {
    const category = await Category.findById(req.body.category);

    if (!category) {
        return res.status(400).send("Category not found");
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richdescription: req.body.richdescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countinStock: req.body.countinStock,
        rating: req.body.rating,
        isfeatured: req.body.isfeatured,
    })

    product = await product.save();

    if (!product) {
        res.status(404).send('the product can not be created');
    } else {
        res.send(product);
    }
})

router.delete('/products/:id', async(req, res) => {
    const deletedproduct = await Product.deleteOne({ _id: req.params.id })
    if (!deletedproduct) {
        return res.status(404).send("No such category found")
    } else {
        res.send(`${deletedproduct} has been removed`)
    }

})

module.exports = router;