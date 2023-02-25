const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// constraseña
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');
const { isValid } = require('../modules/validateString');

const schemaRegister = Joi.object({
    userName: Joi.string().min(6).max(255).required(),
    name: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    role: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    userName: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaUpdate = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

//login

router.post('/login', async (req, res) => {

    console.log("alguien se logueo en auth")
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const {userName} = req.body

    const user = await User.findOne({ userName: userName });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

    // create token
    const token = jwt.sign({
        name: user.name,
        role: user.role,
        id: user._id
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })


    // res.json({
    //     error: null,
    //     data: 'exito bienvenido'
    // })
})

//register

router.post('/register', async (req, res) => {
    const {name, email, userName, lastName, role} =req.body
    // validate user
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    
    for (const property in req.body) {
        if(property==='password' || property==='email') continue
        if (isValid(req.body[property])) return res.status(400).json({error: `Caracteres no válidos en ${property}`})
    }

    const isUserNameExist = await User.findOne({ userName: userName });
    if (isUserNameExist) {
        return res.status(400).json({error: 'user-name ya registrado'})
    }

    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) {
        return res.status(400).json({error: 'Email ya registrado'})
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        userName: userName,
        name: name,
        lastName: lastName,
        email: email,
        role: role,
        password: password
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router;