const express = require('express');
const router = express. Router();
const NotasController = require('../controllers/NotasController');


// Rotas explícitas com a base /curso
router.get('/',NotasController.listarTodos);
router.get('/:id',NotasController.listarPorId);
router.post('/',NotasController.salvar);
router.put('/:id',NotasController.editar);
router.delete('/:id',NotasController.deletar);

module.exports = router;