import express from 'express';
const router = express.Router();
import crud from '../controllers/CrudCurtida.js';

//ROTAS
router.post('/publicacao', crud.adicionarCurtidaPub);
router.delete('/publicacao', crud.removerCurtidaPub);
router.post('/comentario', crud.adicionarCurtidaCom);
router.delete('/comentario', crud.removerCurtidaCom);

export default router;