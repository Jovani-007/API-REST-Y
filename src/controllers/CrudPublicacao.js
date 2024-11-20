import { Sequelize } from 'sequelize';
import Comentario from '../models/Comentarios.js';
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
        const novaPublicacao = await Publicacao.create({ publicacao, usuario_id, qtd_likes: 0 });
        return response.status(201).json(novaPublicacao);
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao criar a publicação' });
    }
}

const listarPublicacoes = async (request, response) => {
    try {
        const publicacoes = await Publicacao.findAll({
            include: {
                model: Usuario,
                attributes: ['id', 'nick', 'imagem'] 
            }
        });

        const lista = publicacoes.map(publicacao => ({
            publicacao_id: publicacao.id,
            publicacao: publicacao.publicacao,
            usuario_id: publicacao.usuario_id,
            nick: publicacao.Usuario.nick,
            imagem: publicacao.Usuario.imagem,
            qtd_likes: publicacao.qtd_likes,
        }));

        return response.status(200).json({
            data: lista,
            total: lista.length
        });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao buscar publicações' });
    }
};

const listarPubCC = async (request, response) => {
    // const { usuario_id } = request.params; 

    // try {
    //     const usuario = await Usuario.findByPk(usuario_id);
    //     if (!usuario) {
    //         return response.status(404).json({ erro: 'Usuário não encontrado' });
    //     }

    //     const publicacoes = await Publicacao.findAll({
    //         where: { usuario_id },
    //         include: [
    //             {
    //                 model: Usuario,
    //                 attributes: ['id', 'nick', 'imagem'] 
    //             },
    //             {
    //                 model: Comentario,
    //                 attributes: [],  
    //                 required: false
    //             }
    //         ],
    //         group: ['publicacoes.id', 'usuario.id'],  
    //         attributes: {
    //             include: [
    //                 [Sequelize.fn('COUNT', Sequelize.col('comentarios.id')), 'qtd_comentarios']  
    //             ]
    //         }
    //     });

    //     const lista = publicacoes.map(publicacao => ({
    //         publicacao_id: publicacao.id,
    //         publicacao: publicacao.publicacao,
    //         usuario_id: publicacao.usuario_id,
    //         nick: publicacao.Usuario.nick,
    //         imagem: publicacao.Usuario.imagem,
    //         qtd_likes: 0,  
    //         qtd_comentarios: publicacao.qtd_comentarios || 0
    //     }));

    //     return response.status(200).json({
    //         data: lista,
    //         total: lista.length,
    //     });
        
    // } catch (error) {
    //     console.error(error);
    //     return response.status(500).json({ erro: 'Erro ao buscar as publicações', detalhe: error.message });
    // }
};

export default { criarPublicacao, listarPublicacoes, listarPubCC };