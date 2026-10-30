const express = require('express');
const estudanteRoutes = require('./src/routes/estudanteRoutes');
const CursoRoutes = require('./src/routes/CursoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Registra as rotas da aplicação
app.use('/estudantes', estudanteRoutes);
app.use('/cursos', CursoRoutes);

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
 });