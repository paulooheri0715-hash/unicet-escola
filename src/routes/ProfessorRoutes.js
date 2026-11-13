
const express = require('express');
const router = express.Router();
const ProfessorController = require('../controllers/ProfessorController');

router.get('/', ProfessorController.listarTodos);
router.get('/:id', ProfessorController.listarPorId);
router.post('/', ProfessorController.salvar);
router.put('/:id', ProfessorController.editar);
router.delete('/:id', ProfessorController.deletar);

module.exports = router;
