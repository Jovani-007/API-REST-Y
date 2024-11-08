import Publicacao from "../models/Publicacao.js";
import Usuario from "../models/Usuario.js";

const criarPublicacao = async (request, response) => {
    const { publicacao, usuario_id } = request.body;

    if (!publicacao || !usuario_id) {
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return response.status(400).json({ erro: 'Usuário não encontrado' });
        }

        const novaPublicacao = await Publicacao.create({ publicacao, usuario_id });
        return response.status(201).json({ publicacao_id: novaPublicacao.id });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao criar a publicação' });
    }
}

export default { criarPublicacao };