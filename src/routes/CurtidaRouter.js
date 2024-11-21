import express from 'express';
const router = express.Router();
import crud from '../controllers/CrudCurtida.js';

//ROTAS
router.post('/publicacoes', crud.adicionarCurtidaPub);
router.delete('/publicacoes', crud.removerCurtidaPub);
router.post('/comentarios', crud.adicionarCurtidaCom);
router.delete('/comentarios', crud.removerCurtidaCom);

export default router;