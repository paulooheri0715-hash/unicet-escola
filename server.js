const express = require('express');
const estudanteRoutes = require('./src/routes/estudanteRoutes');
const CursoRoutes = require('./src/routes/CursoRoutes');
const DisciplinaRoutes = require('./src/routes/disciplinaRoutes');
const MatriculaRoutes = require('./src/routes/MatriculaRoutes');
const ProfessorRoutes = require('./src/routes/ProfessorRoutes');
const NotasRoutes = require('./src/routes/NotasRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger-output.json');

const app = express();
const PORT = 3000;

app.use(express.json());

// Registra as rotas da aplicação
app.use('/estudantes', estudanteRoutes);
app.use('/cursos', CursoRoutes);
app.use('/Disciplinas', DisciplinaRoutes);
app.use('/Matriculas', MatriculaRoutes);
app.use('/Professores', ProfessorRoutes);
app.use('/Notas', NotasRoutes);




app.use('/api-docs' , swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
 });

