import Comentario from '../models/Comentarios.js';
import Publicacao from '../models/Publicacoes.js';
import Usuario from '../models/Usuarios.js';

const criarComentario = async (request, response) => {
    const { publicacao_id, usuario_id, comentario } = request.body;
    
    const publExistente = await Publicacao.findByPk(publicacao_id);
    const userExistente = await Usuario.findByPk(usuario_id);

    if (!comentario || !publicacao_id || !usuario_id) {
        if (!userExistente) {
            return response.status(400).json({ erro: 'Usuário não encontrado' });
        }
        if (!publExistente) {
            return response.status(400).json({ erro: 'Publicação não encontrada' });
        }

        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const novoComentario = await Comentario.create({ publicacao_id, usuario_id, comentario });
        return response.status(201).json(comentario);
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao criar comentário' });
    }
}

const listarComentarios = async (request, response) => {
    const { publicacao_id } = request.query;

    if (!publicacao_id) {
        return response.status(400).json({ erro: 'Publicação não informada' });
    }

    try {
        const publicacao = await Publicacao.findByPk(publicacao_id);
        if (!publicacao) {
            return response.status(404).json({ erro: 'Publicação não encontrada' });
        }

        const comentarios = await Comentario.findAll({
            where: { publicacao_id },
            include: {
                model: Usuario,
                attributes: ['id', 'nick', 'imagem'],
            },
        });

        const lista = comentarios.map((comentario) => ({
            comentario_id: comentario.id,
            comentario: comentario.comentario,
            usuario_id: comentario.Usuario.id,
            nick: comentario.Usuario.nick, 
            imagem: comentario.Usuario.imagem || "https://cdn-icons-png.flaticon.com/128/149/149071.png",
            criado_em: new Date(),
        }));

        return response.status(200).json({
            data: lista,
            total: lista.length,
        });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao buscar os comentários', detalhe: error.message });
    }
};


const deletarComentário = async (request, response) => {
    const { comentario_id, usuario_id } = request.body;

    if (!comentario_id || !usuario_id) {
        return response.status(400).json({ erro: 'Comentário e usuário devem ser informados' })
    }

    try {
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return response.status(400).json({ erro: 'Usuário não encontrado' });
        }

        const comentario = await Comentario.findByPk(comentario_id);
        if (!comentario) {
            return response.status(400).json({ erro: 'Comentário não encontrado' });
        }

        if (comentario.usuario_id !== usuario_id) {
            return response.status(403).json({ erro: 'Usuário não autorizado' });
        }

        await comentario.destroy();

        return response.status(204).send();
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao excluir comentário', detalhe: error.message });
    }

}

export default { criarComentario, listarComentarios, deletarComentário };