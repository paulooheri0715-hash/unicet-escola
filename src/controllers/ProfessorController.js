const db = require('../database/db');
const Professor = require('../models/Professor');

let professores = [];
let proximoId = 1;

class ProfessorController {

    // Listar todos os professores
    static listarTodos(req, res) {
        return res.status(200).json(professores);
    }

    // Listar professor por ID
    static listarPorId(req, res) {
        const id = parseInt(req.params.id);

        const professor = professores.find(p => p.id === id);

        if (!professor) {
            return res.status(404).json({
                mensagem: 'Professor não encontrado.'
            });
        }

        return res.status(200).json(professor);
    }

    // Salvar professor
    static salvar(req, res) {
        const { nome, email, titulacao, telefone } = req.body;

        if (!nome || !email || !titulacao || !telefone) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios.'
            });
        }

        const professor = new Professor(
            proximoId++,
            nome,
            email,
            titulacao,
            telefone
        );

        professores.push(professor);

        return res.status(201).json({
            mensagem: 'Professor cadastrado com sucesso!',
            professor
        });
    }

    // Editar professor
    static editar(req, res) {
        const id = parseInt(req.params.id);

        const indice = professores.findIndex(p => p.id === id);

        if (indice === -1) {
            return res.status(404).json({
                mensagem: 'Professor não encontrado.'
            });
        }

        const { nome, email, titulacao, telefone } = req.body;

        if (!nome || !email || !titulacao || !telefone) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios.'
            });
        }

        professores[indice] = {
            id,
            nome,
            email,
            titulacao,
            telefone
        };

        return res.status(200).json({
            mensagem: 'Professor atualizado com sucesso!',
            professor: professores[indice]
        });
    }

    // Deletar professor
    static deletar(req, res) {
        const id = parseInt(req.params.id);

        const indice = professores.findIndex(p => p.id === id);

        if (indice === -1) {
            return res.status(404).json({
                mensagem: 'Professor não encontrado.'
            });
        }

        professores.splice(indice, 1);

        return res.status(200).json({
            mensagem: 'Professor removido com sucesso!'
        });
    }
}

module.exports = ProfessorController;
