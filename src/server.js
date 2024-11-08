import express from 'express';
import sequelize from './config/database.js';
import bodyParser from 'body-parser';
import usuarioRouter from './routes/UsuarioRouter.js';
import publicacaoRouter from './routes/PublicacaoRouter.js';
import comentarioRouter from './routes/ComentarioRouter.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/usuarios', usuarioRouter);
app.use('/publicacoes', publicacaoRouter);
app.use('/comentarios', comentarioRouter);

const startServer = async () => {   
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Servidor está rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor: ", error);
    }
};

startServer();
