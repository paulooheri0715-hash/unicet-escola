const express = require('express');
const router = express. Router();
const EstudanteController = require('../controllers/EstudanteController');

// Rotas explícitas com a base /estudante
router.get('/', EstudanteController.listarTodos);
router.get('/:id', EstudanteController.listarPorId);
router.post('/', EstudanteController.salvar);
router.put('/:id', EstudanteController.editar);
router.delete('/:id', EstudanteController.deletar);

module.exports = router;