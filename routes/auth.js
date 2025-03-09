const express = require('express');
const router = express.Router();
const Usermodel = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const connectToDB = require('../config/mongoose-connection');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser')


const JWT_SECRET = "tukka"
router.post('/register', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
     await connectToDB();
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        const olduser = await Usermodel.findOne({ email: req.body.email });
        if (olduser) {
            return res.status(400).json({ errors: [{success, msg: 'User already exists' }] });
        }

        const { name, email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);

        const user = await Usermodel.create({
            name,
            email,
            password: hashpassword
        });


        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        success = true;
        res.json({success,token});
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
     await connectToDB();
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;


        const user = await Usermodel.findOne({ email });

        if (!user) {
            success = false
            return res.status(400).json({ errors: [{success, msg: 'Email or password is incorrect!' }] });
        }
        const comparepass = await bcrypt.compare(password, user.password);

        if (!comparepass) {
            success = false;
            return res.status(400).json({ errors: [{success, msg: 'Email or password is incorrect!' }] });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        success = true;
        res.json({ success, token });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/getuser', fetchuser, async (req, res) => {
    try {
         await connectToDB();
        const id = req.user.id;
        const user = await Usermodel.findById(id).select('-password');
        res.send(user)
    } catch (error) {
        console.error('Error in /getuser route:', error); 
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
