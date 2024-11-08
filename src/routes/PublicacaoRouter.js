import express from 'express';
const router = express.Router();
import controller from '../controller/PublicacaoController.js';

router.post('/', controller.criarPublicacao);

export default router;