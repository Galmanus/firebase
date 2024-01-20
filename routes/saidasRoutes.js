const express = require('express');
const router = express.Router();
const SaidaController = require('../controllers/SaidaController');

// Rota para criar uma nova saida
router.post('/Saidas', saidaController.createSaida);

// Rota para obter todos as saidas
router.get('/Saidas', saidaController.getAllSaidas);

// Rota para obter uma saida pelo ID
router.get('/Saidas/:id', saidaController.getSaidaById);

// Rota para atualizar uma saida
router.put('/Saidas/:id', saidaController.updateSaida);

// Rota para deletar uma saida
router.delete('/Saidas/:id', saidaController.deleteSaida);

module.exports = router;
