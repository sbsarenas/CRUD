const { json } = require('express');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const Task = require('../model/task');
const bodyParser = require('body-parser')
const cors = require('cors')
const { validationResult } = require('express-validator')


router.use(bodyParser.json())
router.use(cors())

router.get('/', async(req, res) => {
    const tasks = await Task.find();
    console.log(JSON.stringify(tasks))
    res.status(200).json({ message: 'Respuesta Formulario', data: { tasks } })
});

router.post('/add', [
        body('nombre')
        .exists()
        .withMessage('El nombre es requerido')
        .matches(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)
        .withMessage('El nombre debe solo contener letras')
        .trim()
        .escape(),
        body('edad')
        .exists()
        .withMessage('La edad es requerida')
        .matches(/[0-9]+$/)
        .withMessage('La edad solo debe tener numeros')
        .trim()
        .escape(),
        body('correo')
        .exists()
        .withMessage('El correo es requerido')
        .matches(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)
        .withMessage('No debe contener caracteres')
        .trim()
        .escape(),
        

    ],
    async(req, res, next) => {
        const errors = validationResult(req)
        console.log(errors.array())
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.body)
        const task = new Task(req.body)
        console.log(task)
        await task.save()
        res.end()
            // res.redirect('/')
    });


router.put('/edit/:id', async(req, res, next) => {
    const { id } = req.params
    await Task.update({ _id: id }, req.body)
    res.redirect('/')
});

router.delete('/delete/:id', async(req, res, next) => {
    let { id } = req.params
    await Task.remove({ _id: id })
    res.redirect('/')
});


module.exports = router;