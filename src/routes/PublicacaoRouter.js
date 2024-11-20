import express from 'express';
const router = express.Router();
import crud from '../controllers/CrudPublicacao.js';

//ROTAS
router.post('/', crud.criarPublicacao);
router.get('/', crud.listarPublicacoes);
router.get('/de/:usuario_id', crud.listarPubCC);

export default router;