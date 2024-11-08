import Comentario from "../models/Comentario.js";
import Publicacao from "../models/Publicacao.js";
import Usuario from "../models/Usuario.js";

const criarComentario = async (request, response) => {
    const { publicacao_id, usuario_id, comentario } = request.body;

    if (!publicacao_id || !usuario_id || !comentario) {
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const publicacao = await Publicacao.findByPk(publicacao_id);
        if (!publicacao) {
            return response.status(400).json({ erro: 'Publicação não encontrada' });
        }

        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return response.status(400).json({ erro: 'Usuário não encontrado' });
        }

        const novoComentario = await Comentario.create({ comentario, usuario_id, publicacao_id });
        return response.status(201).json({ comentario_id: novoComentario.id });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao criar comentário' });
    }
}

export default { criarComentario };