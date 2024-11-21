import express from 'express';
import sequelize from './database/database.js';
import bodyParser from 'body-parser';
import usuarioRouter from './routes/UsuarioRouter.js';
import publicacaoRouter from './routes/PublicacaoRouter.js';
import comentarioRouter from './routes/ComentarioRouter.js';
import curtidaRouter from './routes/CurtidaRouter.js';
import seguidorRouter from './routes/SeguidorRouter.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/usuarios', usuarioRouter);
app.use('/publicacoes', publicacaoRouter);
app.use('/comentarios', comentarioRouter);
app.use('/curtidas', curtidaRouter);
app.use('/seguidores', seguidorRouter);

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
