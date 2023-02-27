const router = require('express').Router();
const User = require('../models/User');


//Editar otro usuario

router.put('/admin/edit/', async (req, res) => {
    const body = req.body;
    const {_id} = req.body;
    console.log(_id)
    console.log('body', body)
    console.log('body', req.user)
    const {role} = req.user

    if (role!=='admin') res.status(403).json({error: 'Usuario no tiene permiso'})

    try {
        const userDB = await User.findByIdAndUpdate(
            _id, body, { useFindAndModify: false }
        )
        res.json({
            estado: true,
            mensaje: 'exito',
            data: req.body,
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

//Editar propio usuario

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const {name, lastName, email} = req.body;
    const body={name, lastName, email}
    console.log(_id)
    console.log('body', body)
    console.log('body', req.user)
    const idUser = req.user.id

    if (idUser!==id) res.status(403).json({error: 'Usuario no tiene permiso'})

    try {
        const userDB = await User.findByIdAndUpdate(
            {_id:id}, body, { useFindAndModify: false }
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