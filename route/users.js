const user = require('../model/user')

const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();
router.use(bodyparser.json());


router.get('/users', async(req, res) => {
    try {
        const UserList = await user.find();
        res.status(200).json({ success: true, categories: UserList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.get('/users/:id', async(req, res) => {
    try {
        const UserList = await user.findById(req.params.id);
        res.status(200).json({ success: true, categories: UserList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.post('/users', async(req, res) => {
    let User = new user({
        name: req.body.name,
        email: req.body.email,
        passwordhash: bcrypt.hashSync(req.body.password, 10),
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        isadmin: req.body.isadmin,
    })

    User = await User.save();

    if (!User) {
        res.status(404).send('the category can not be created');

    }
    res.send(User);

})

router.post('/login', async(req, res) => {
    const User = await user.findOne({ email: req.body.email })

    if (!User) {
        return res.status(400).send("the user not found");
    }
    if (User && bcrypt.compareSync(req.body.password, User.passwordhash)) {

        const token = jwt.sign({ id: User._id }, process.env.secret, {
            expiresIn: "1d"
        });
        res.status(200).send({ user: User.email, token: token })
    } else {
        res.status(400).send('password is wrong')
    }
})


module.exports = router;