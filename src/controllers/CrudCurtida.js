import Publicacao from '../models/Publicacoes.js';
import Comentario from '../models/Comentarios.js';

const adicionarCurtidaPub = async (request, response) => {
    const { publicacao_id } = request.body;

    if (!publicacao_id) {
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const publicacao = await Publicacao.findByPk(publicacao_id);
        if (!publicacao) {
            return response.status(400).json({ erro: 'Publicação não encontrada', detalhe: error.message });
        }

        publicacao.qtd_likes += 1;
        await publicacao.save();

        return response.status(200).json({ qtd_likes: publicacao.qtd_likes });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao adicionar curtida', detalhe: error.message });
    }
};

const removerCurtidaPub = async (request, response) => {
    const { publicacao_id } = request.body;

    if (!publicacao_id) {
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const publicacao = await Publicacao.findByPk(publicacao_id);
        if (!publicacao) {
            return response.status(400).json({ erro: 'Publicação não encontrada' });
        }

        if (publicacao.qtd_likes > 0) {
            publicacao.qtd_likes -= 1;
            await publicacao.save();
        }

        return response.status(200).json({ qtd_likes: publicacao.qtd_likes });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao remover curtida', detalhe: error.message });
    }
};

const adicionarCurtidaCom = async (request, response) => {
    const { comentario_id } = request.body;

    if (!comentario_id) {
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const comentario = await Comentario.findByPk(comentario_id);
        if (!comentario) {
            return response.status(400).json({ erro: 'Comentário não encontrado' });
        }

        comentario.qtd_likes += 1;
        await comentario.save();

        return response.status(200).json({ qtd_likes: comentario.qtd_likes });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao adicionar curtida', detalhe: error.message });
    }
};

const removerCurtidaCom = async (request, response) => {
    const { comentario_id } = request.body;

    if (!comentario_id) {
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const comentario = await Comentario.findByPk(comentario_id);
        if (!comentario) {
            return response.status(400).json({ erro: 'Publicação não encontrada' });
        }
        if (comentario.qtd_likes > 0) {
            comentario.qtd_likes -= 1;
            await comentario.save();
        }

        return response.status(200).json({ qtd_likes: comentario.qtd_likes });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao remover curtida', detalhe: error.message });
    }
};

export default { adicionarCurtidaPub, removerCurtidaPub, adicionarCurtidaCom, removerCurtidaCom };