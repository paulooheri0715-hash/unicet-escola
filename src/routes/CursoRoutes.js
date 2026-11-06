const express = require('express');
const router = express. Router();
const cursoController = require('../controllers/CursoController');


// Rotas explícitas com a base /curso
router.get('/',cursoController.listarTodos);
router.get('/:id',cursoController.listarPorId);
router.post('/', cursoController.salvar);
router.put('/:id',cursoController.editar);
router.delete('/:id', cursoController.deletar);

module.exports = router;