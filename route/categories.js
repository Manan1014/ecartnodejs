const Category = require('../model/catagory');

const express = require('express');
const bodyparser = require('body-parser');

const router = express.Router();
router.use(bodyparser.json());
router.get('/categories', async(req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json({ success: true, categories: categoryList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.get('/categories/:id', async(req, res) => {
    try {
        const catId = req.params.id;
        const categoryDetails = await Category.findById(catId);
        if (!categoryDetails) {
            return res.status(404).json({ success: false, message: 'Category not found.' })
        } else {
            res.status(200).json({ success: true, category: categoryDetails });
        }
    } catch (err) {
        console.log(err);
    }
})

router.put('/categories/:id', async(req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id, {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color
            }, { new: true }
        )

        if (!category) {
            return res.status(404).send("No category with that id")
        } else {
            return res.status(200).send(category)
        }
    } catch (err) {
        console.log("sorry! we can not update it");
        console.log(err);
    }
})

router.post('/categories', async(req, res) => {
    let category = new Category({
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
    })

    category = await category.save();

    if (!category) {
        res.status(404).send('the category can not be created');

    }
    res.send(category);

})

router.delete('/categories/:id', async(req, res) => {
    const deletedCategory = await Category.deleteOne({ _id: req.params.id })
    if (!deletedCategory) {
        return res.status(404).send("No such category found")
    } else {
        res.send(`${deletedCategory} has been removed`)
    }

})

module.exports = router;