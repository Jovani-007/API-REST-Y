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
    /**
     * TODO 
     * */

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
    //                 attributes: ['id', 'nick', 'imagem'],
    //             },
    //             {
    //                 model: Comentario,
    //                 attributes: [],
    //                 required: false, // Permite publicações sem comentários
    //             }
    //         ],
    //         group: ['publicacoes.id', 'usuario.id'],
    //         attributes: {
    //             include: [
    //                 [Sequelize.fn('COUNT', Sequelize.col('comentarios.id')), 'qtd_comentarios'],
    //                 'publicacao',
    //                 'qtd_likes',
    //                 'createdAt',
    //             ]
    //         }
    //     });

    //     const lista = publicacoes.map(publicacao => ({
    //         publicacao_id: publicacao.id,
    //         publicacao: publicacao.publicacao,
    //         usuario_id: publicacao.usuario_id,
    //         nick: publicacao.Usuario.nick,
    //         imagem: publicacao.Usuario.imagem,
    //         qtd_likes: publicacao.qtd_likes,
    //         qtd_comentarios: publicacao.qtd_comentarios || 0,
    //         criado_em: publicacao.createdAt
    //     }));

    //     return response.status(200).json({
    //         data: lista,
    //         total: lista.length,
    //     });

    // } catch (error) {
    //     return response.status(500).json({ erro: 'Erro ao buscar as publicações', detalhe: error.message });
    // }
};

const obterPubC = async (request, response) => {
    /**
     * TODO
     */
    
    // const { publicacao_id } = request.params;

    // try {
    //     const publicacao = await Publicacao.findOne({
    //         where: { id: publicacao_id },
    //         include: [
    //             {
    //                 model: Usuario,
    //                 attributes: ['id', 'nick', 'imagem']
    //             },
    //             {
    //                 model: Comentario,
    //                 include: {
    //                     model: Usuario,
    //                     attributes: ['id', 'nick', 'imagem']
    //                 }
    //             }
    //         ]
    //     });

    //     if (!publicacao_id) {
    //         return response.status(404).json({ erro: 'Publicação não encontrada' });
    //     }
    
    //     const lista = {
    //         publicacao_id: publicacao.id,
    //             publicacao: publicacao.publicacao,
    //             usuario_id: publicacao.usuario_id,
    //             nick: publicacao.Usuario.nick,
    //             imagem: publicacao.Usuario.imagem,
    //             qtd_likes: publicacao.qtd_likes,
    //             criado_em: publicacao.criado_em,
    //             comentarios: publicacao.Comentarios.map(comentario => ({
    //                 comentario_id: comentario.id,
    //                 comentario: comentario.comentario,
    //                 usuario_id: comentario.usuario_id,
    //                 nick: comentario.Usuario.nick,
    //                 imagem: comentario.Usuario.imagem,
    //                 qtd_likes: comentario.qtd_likes,
    //             }))
    //     }

    //     return response.status(200).json(lista);
    // } catch (error) {
    //     return response.status(500).json({ erro: 'Erro ao buscar a publicação', detalhe: error.message });
    // }
}

const deletarPublicacao = async (request, response) => {
    const { publicacao_id, usuario_id } = request.body;

    if (!publicacao_id || !usuario_id) {
        return response.status(400).json({ erro: 'Publicação e usuário devem ser informados' });
    }

    try {
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return response.status(400).json({ erro: 'Usuário não encontrado' });
        }

        const publicacao = await Publicacao.findByPk(publicacao_id);
        if (!publicacao) {
            return response.status(400).json({ erro: 'Publicação não encontrada' });
        }

        if (publicacao.usuario_id !== usuario_id) {
            return response.status(403).json({ erro: 'Usuário não autorizado' });
        }

        await Comentario.destroy({
            where: { publicacao_id: publicacao_id }
        });

        await publicacao.destroy();

        return response.status(200).json({ mensagem: 'Publicação deletada com sucesso' });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao excluir publicação', detalhe: error.message });
    }
};


export default { criarPublicacao, listarPublicacoes, listarPubCC, obterPubC, deletarPublicacao };