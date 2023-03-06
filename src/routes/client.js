const router = require('express').Router();
const Client = require('../models/Client');

//Search client
router.get('/Search/', async (req, res) => {
    const body = req.body;
    console.log('body', body)
    console.log('body', req.user)
    const {role} = req.user

    if (role!=='moderator' || role!=='admin') res.status(403).json({error: 'Usuario no tiene permiso'})

    try {
        const userDB = await Client.find(
            body
        )
        res.json({
            estado: true,
            mensaje: 'exito',
            data: req.body, //borrar
            user:userDB
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'error'
        })
    }
})

//create

router.post('/register', async (req, res) => {
    const {name, email, username, lastName, role} =req.body
    // validate user
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    
    for (const property in req.body) {
        if(property==='password' || property==='email') continue
        if (isValid(req.body[property])) return res.status(400).json({error: `Caracteres no válidos en ${property}`})
    }

    const isUsernameExist = await User.findOne({ username: username });
    if (isUsernameExist) {
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
        username: username,
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

//Editar Cliente por moderador

router.put('/edit/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    console.log(_id)
    console.log('body', body)
    console.log('body', req.user)
    const {role} = req.user

    if (role!=='moderator' || role!=='admin') res.status(403).json({error: 'Usuario no tiene permiso'})

    try {
        const userDB = await Client.findByIdAndUpdate(
            _id, body, { useFindAndModify: false }
        )
        res.json({
            estado: true,
            mensaje: 'exito',
            data: req.body, //borrar
            user:userDB
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'error'
        })
    }
})

module.exports = router;