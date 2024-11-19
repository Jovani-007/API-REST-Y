import express from 'express';
const router = express.Router();
import crud from '../controllers/CrudPublicacao.js';

//ROTAS
router.post('/', crud.criarPublicacao);

export default router;