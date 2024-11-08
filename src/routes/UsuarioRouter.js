import express from 'express';
const router = express.Router();
import controller from '../controller/UsuarioController.js';

router.post('/', controller.criarUsuario);
router.get('/', controller.listarUsuarios);
router.get('/:usuario_id', controller.detalharUsuario);
router.patch('/:usuario_id', controller.atualizarUsuario);

export default router;