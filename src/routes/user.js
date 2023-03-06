const router = require('express').Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');


//Editar otro usuario

router.put('/admin/edit/', async (req, res) => {
    const {reduceObject} = require("../modules/selectedParams")
    const body = reduceObject(req.body,["password","_id"]);
    const {_id} = req.body;
    const {role} = req.user

    if (role!=='admin') res.status(403).json({error: 'Usuario no tiene permiso'})

    try {
        const isActiveUser = await User.findById(_id)
        if (!isActiveUser.isActive) return res.status(403).json({error: 'Usuario inactivo'})

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

//Edit own user

router.put('/edit/', async (req, res) => {
    const {filterObject} = require("../modules/selectedParams")

    const id = req.body._id;
    if (!id) res.status(404).json({error: 'incluya el id del usuario'})

    const body = filterObject(req.body, ["email", "numberPhone"])

    const idUser = req.user.id

    if (idUser!==id) res.status(403).json({error: 'Usuario no tiene permiso'})
    
    if (req.body.hasOwnProperty('password')) {
        // hash contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        body.password = password
    }

    try {
        const isActiveUser = await User.findById({_id:id})
        if (!isActiveUser.isActive) return res.status(403).json({error: 'Usuario inactivo'})

        const userDB = await User.findByIdAndUpdate(
            {_id:id}, body, { useFindAndModify: false }
        )
        const bodyDB = filterObject(userDB, ["username", "email", "numberPhone"])
        res.json({
            estado: true,
            mensaje: 'exito',
            user:bodyDB
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