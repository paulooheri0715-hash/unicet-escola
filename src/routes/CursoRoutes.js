const express = require('express');
const router = express. Router();
const Cursocontroller = require('../controllers/Cursocontroller');
const cursoController = require('../controllers/Cursocontroller');

// Rotas explícitas com a base /curso
router.get('/',cursoController.listarTodos);
router.get('/:id',cursoController.listarPorId);
router.post('/', cursoController.salvar);
router.put('/:id',cursoController.editar);
router.delete('/:id', Cursocontroller.deletar);

module.exports = router;