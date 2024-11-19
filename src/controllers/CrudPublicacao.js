import Publicacao from '../models/Publicacoes.js';
import Usuario from '../models/Usuarios.js';

const criarPublicacao = async (request, response) => {
    const { publicacao, usuario_id } = request.body;
    
    const userExistente = await Usuario.findByPk(usuario_id);
    if (!publicacao || !usuario_id) {
        if (!userExistente) {
            return response.status(400).json({ erro: 'Usuário inexistente' });
        }
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const novaPublicacao = await Publicacao.create({ 
            publicacao, usuario_id, qtd_likes: 0
        });
        return response.status(201).json(novaPublicacao);
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao criar a publicação' });
    }
}

export default { criarPublicacao };