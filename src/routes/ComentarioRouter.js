import express from 'express';
const router = express.Router();
import crud from '../controllers/CrudComentario.js';

//ROTAS
router.post('/', crud.criarComentario);
router.get('/', crud.listarComentarios);
router.delete('/', crud.deletarComentário);

export default router;