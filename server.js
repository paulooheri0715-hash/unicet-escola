const express = require('express');
const estudanteRoutes = require('./src/routes/estudanteRoutes');
const CursoRoutes = require('./src/routes/CursoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger-output.json');

const app = express();
const PORT = 3000;

app.use(express.json());

// Registra as rotas da aplicação
app.use('/estudantes', estudanteRoutes);
app.use('/cursos', CursoRoutes);
app.use('/api-docs' , swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
 });

