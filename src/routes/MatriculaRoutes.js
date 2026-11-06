const express = require('express');
const router = express.Router();
const MatriculaController = require('../controllers/MatriculaController');

router.get('/', MatriculaController.listarTodos);
router.get('/:id', MatriculaController.listarPorId);
router.post('/', MatriculaController.salvar);
router.put('/:id/status', MatriculaController.editarStatus);
router.delete('/:id', MatriculaController.deletar);

module.exports = router;