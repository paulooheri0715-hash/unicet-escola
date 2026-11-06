const express = require('express');
const router = express.Router();
const DisciplinaController = require('../controllers/DisciplinaController');

router.get('/', DisciplinaController.listarTodos);
router.get('/curso/:curso_id', DisciplinaController.listarPorCurso);
router.get('/:id', DisciplinaController.listarPorId);
router.post('/', DisciplinaController.salvar);
router.put('/:id', DisciplinaController.editar);
router.delete('/:id', DisciplinaController.deletar);

module.exports = router;