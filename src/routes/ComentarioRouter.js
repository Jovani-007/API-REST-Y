import express from 'express';
const router = express.Router();
import controller from '../controller/ComentarioController.js';

router.post('/', controller.criarComentario);

export default router;