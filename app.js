const express = require('express');
const app = express();

// Configuração do Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./sneaker-216ef-firebase-adminsdk-72g8g-a6ec8c2e3d.json');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importar rotas
const produtosRoutes = require('./routes/produtosRoutes');
const entradasRoutes = require('./routes/entradasRoutes');
const saidasRoutes = require('./routes/saidasRoutes');


// Usar rotas
app.use('/api', produtosRoutes);
app.use('/api', entradasRoutes);
app.use('/api', saidasRoutes);


// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
