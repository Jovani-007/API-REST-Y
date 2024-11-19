import express from 'express';
const router = express.Router();
import crud from '../controllers/CrudUsuario.js';

//ROTAS
router.post('/', crud.criarUsuario);
router.get('/', crud.listarUsuarios);
router.get('/:usuario_id', crud.detalharUsuario);
router.patch('/:usuario_id', crud.atualizarUsuario);

export default router;