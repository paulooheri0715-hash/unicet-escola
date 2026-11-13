const db = require('../database/db');
const Notas = require('../models/Notas');

class NotasController {

    // Listar todas as notas com nome do estudante e disciplina
    static async listarTodos(req, res) {
        try {
            const [notas] = await db.query(`
                SELECT
                    n.id,
                    n.matricula_id,
                    n.disciplina_id,
                    n.valor,
                    n.tipo_avaliacao AS tipoAvaliacao,
                    n.data_lancamento AS dataLancamento,
                    e.nome AS nomeEstudante,
                    d.nome AS nomeDisciplina
                FROM notas n
                INNER JOIN matriculas m ON n.matricula_id = m.id
                INNER JOIN estudantes e ON m.estudante_id = e.id
                INNER JOIN disciplinas d ON n.disciplina_id = d.id
            `);

            return res.status(200).json(notas);

        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao listar notas.',
                erro: error.message
            });
        }
    }

    // Buscar nota por ID
    static async listarPorId(req, res) {
        try {
            const { id } = req.params;

            const [notas] = await db.query(
                'SELECT * FROM notas WHERE id = ?',
                [id]
            );

            if (notas.length === 0) {
                return res.status(404).json({
                    mensagem: 'Nota não encontrada.'
                });
            }

            return res.status(200).json(notas[0]);

        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao buscar nota.',
                erro: error.message
            });
        }
    }

    // Cadastrar nota
    static async salvar(req, res) {
        try {
            const {
                matricula_id,
                disciplina_id,
                valor,
                tipoAvaliacao,
                dataLancamento
            } = req.body;

            if (
                matricula_id == null ||
                disciplina_id == null ||
                valor == null ||
                !tipoAvaliacao ||
                !dataLancamento
            ) {
                return res.status(400).json({
                    mensagem: 'Todos os campos são obrigatórios.'
                });
            }

            const nota = new Nota(
                null,
                matricula_id,
                disciplina_id,
                valor,
                tipoAvaliacao,
                dataLancamento
            );

            const [resultado] = await db.query(
                `INSERT INTO notas
                (matricula_id, disciplina_id, valor, tipo_avaliacao, data_lancamento)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    nota.matricula_id,
                    nota.disciplina_id,
                    nota.valor,
                    nota.tipoAvaliacao,
                    nota.dataLancamento
                ]
            );

            return res.status(201).json({
                mensagem: 'Nota cadastrada com sucesso!',
                id: resultado.insertId,
                ...nota
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao cadastrar nota.',
                erro: error.message
            });
        }
    }

    // Editar nota
    static async editar(req, res) {
        try {
            const { id } = req.params;

            const {
                matricula_id,
                disciplina_id,
                valor,
                tipoAvaliacao,
                dataLancamento
            } = req.body;

            if (
                matricula_id == null ||
                disciplina_id == null ||
                valor == null ||
                !tipoAvaliacao ||
                !dataLancamento
            ) {
                return res.status(400).json({
                    mensagem: 'Todos os campos são obrigatórios.'
                });
            }

            const [resultado] = await db.query(
                `UPDATE notas SET
                    matricula_id = ?,
                    disciplina_id = ?,
                    valor = ?,
                    tipo_avaliacao = ?,
                    data_lancamento = ?
                WHERE id = ?`,
                [
                    matricula_id,
                    disciplina_id,
                    valor,
                    tipoAvaliacao,
                    dataLancamento,
                    id
                ]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: 'Nota não encontrada.'
                });
            }

            return res.status(200).json({
                mensagem: 'Nota atualizada com sucesso!'
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao atualizar nota.',
                erro: error.message
            });
        }
    }

    // Deletar nota
    static async deletar(req, res) {
        try {
            const { id } = req.params;

            const [resultado] = await db.query(
                'DELETE FROM notas WHERE id = ?',
                [id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: 'Nota não encontrada.'
                });
            }

            return res.status(200).json({
                mensagem: 'Nota removida com sucesso!'
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao deletar nota.',
                erro: error.message
            });
        }
    }

    // Listar notas por matrícula
    static async listarPorMatricula(req, res) {
        try {
            const { matricula_id } = req.params;

            const [notas] = await db.query(`
                SELECT
                    n.id,
                    n.matricula_id,
                    n.disciplina_id,
                    n.valor,
                    n.tipo_avaliacao AS tipoAvaliacao,
                    n.data_lancamento AS dataLancamento,
                    e.nome AS nomeEstudante,
                    d.nome AS nomeDisciplina
                FROM notas n
                INNER JOIN matriculas m ON n.matricula_id = m.id
                INNER JOIN estudantes e ON m.estudante_id = e.id
                INNER JOIN disciplinas d ON n.disciplina_id = d.id
                WHERE n.matricula_id = ?
            `, [matricula_id]);

            return res.status(200).json(notas);

        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao listar notas da matrícula.',
                erro: error.message
            });
        }
    }
}

module.exports = NotasController;
