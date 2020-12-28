const express = require('express')
const router = express.Router()

const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {

    try {
        const arrayMascotasDB = await Mascota.find()
        // console.log(arrayMascotasDB)
        res.render('mascotas', {
           arrayMascotas: arrayMascotasDB
    })
    } catch (error) {
        console.log(error)
    }

    
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        // const mascotasDB = new Mascota(body)
        // await mascotasDB.save()
        // res.redirect('/mascotas')
        await Mascota.create(body)
        res.redirect('/mascotas')
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    
    const id = req.params.id

    try {
        const mascotaDb = await Mascota.findOne({ _id: id })
        
        res.render('detalle', {
            mascotas: mascotaDb,
            error: false
        })
    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const mascotaDb = await Mascota.findByIdAndDelete({ _id: id })
        if (mascotaDb) {
            res.json({
                estado: true,
                mensaje: 'Eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'No se pudo Eliminar'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const mascotaDb = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })
        res.json({
            estado: true,
            mensaje: 'Eliminado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Fallo eliminar'
        })
    }
})

module.exports = router
