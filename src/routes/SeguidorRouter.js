import express from 'express';
const router = express.Router();
import crud from '../controllers/CrudSeguidor.js';

//ROTAS
router.post('/', crud.seguir);
router.delete('/', crud.deixarSeguir);
router.get('/:usuario_id', crud.listarSeguidores);
router.get('/seguindo/:usuario_id', crud.listarSeguindo);

export default router;