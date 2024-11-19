import Publicacao from "../models/Publicacao.js";
import Usuario from "../models/Usuario.js";
import sequelize from "../config/database.js";

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

const listarPublicacoes = async (request, response) => {
    try {
        const publicacoes = await Publicacao.findAll({
            include: {
                model: Usuario,
                as: 'usuario', 
                attributes: ['id', 'nick', 'imagem'], 
            },
            order: [['createdAt', 'DESC']],
        });

        if (!publicacoes || publicacoes.length === 0) {
            return response.status(404).json({ erro: 'Publicações não encontradas' });
        }
        return response.status(200).json({ data: publicacoes, total: publicacoes.length });

    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao listar as publicações' });
    }
};

(async () => {
    await sequelize.sync();
})();

export default { criarPublicacao,  listarPublicacoes };