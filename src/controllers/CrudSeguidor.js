import Usuario from '../models/Usuarios.js';
import Seguidor from '../models/Seguidores.js';

const seguir = async (request, response) => {
    const { usuario_id, usuario_a_seguir_id } = request.body;
    const seguidor_id = usuario_a_seguir_id;

    if(!usuario_id || !usuario_a_seguir_id) {
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }
    if (usuario_id === usuario_a_seguir_id) {
        return response.status(400).json({ erro: 'Você não pode seguir a si mesmo' });
    }

    try {
        const existe = await Usuario.findByPk(usuario_a_seguir_id);
        if (!existe) {
            return response.status(400).json({ erro: 'Usuário a ser seguido não encontrado' });
        }

        const segue = await Seguidor.findOne({
            where: {
                usuario_id,
                seguidor_id
            }
        });
        if (segue) {
            return response.status(400).json({ erro: 'Você já segue este usuário' });
        }

        const seguidor = await Seguidor.create({
            usuario_id,
            seguidor_id
        });
        
        return response.status(201).json({ seguidor_id: seguidor.id });

    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao seguir o usuário', detalhe: error.message });
    }
};

const deixarSeguir = async (request, response) => {
    const { usuario_id, usuario_a_seguir_id } = request.body;
    const seguidor_id = usuario_a_seguir_id;

    if (!usuario_id || !usuario_a_seguir_id) {
        return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const seguidor = await Seguidor.findOne({
            where: {
                usuario_id,
                seguidor_id
            }
        });
        if (!seguidor) {
            return response.status(400).json({ erro: 'Você não segue este usuário' });
        }

        await seguidor.destroy();

        return response.status(200).json({ seguidor_id: seguidor_id });
    }   catch (error) {
        return response.status(500).json({ erro: 'Erro ao deixar de seguir o usuário' });
    }
};

const listarSeguidores = async (request, response) => {
    const { usuario_id } = request.params;
    const { page = 1, limit = 10 } = request.query;

    if (!usuario_id) {
        return response.status(400).json({ erro: 'O ID do usuário é obrigatório' });
    }

    try {
        const offset = (page - 1) * limit;

        const seguidores = await Seguidor.findAndCountAll({
            where: {
                usuario_id: usuario_id,
            },
            limit: parseInt(limit),
            offset: offset,
            include: {
                model: Usuario,
                attributes: ['id', 'nick', 'nome', 'imagem'],
            },
        });

        const totalPages = Math.ceil(seguidores.count / limit);

        return response.status(200).json({
            data: seguidores.rows.map(seguidor => ({
                seguidor_id: seguidor.id,
                nome: seguidor.Usuario.nome,
                nick: seguidor.Usuario.nick,
                imagem: seguidor.Usuario.imagem,
            })),
            total: seguidores.count,
            currentPage: parseInt(page),
            totalPages: totalPages,
        });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao buscar seguidores', detalhe: error.message });
    }
};

const listarSeguindo = async (request, response) => {
    const { usuario_id } = request.params;

    if (!usuario_id) {
        return response.status(400).json({ erro: 'O ID do usuário é obrigatório' });
    }

    try {
        const seguindo = await Seguidor.findAndCountAll({
            where: {
                seguidor_id: usuario_id,
            },
            include: {
                model: Usuario,
                attributes: ['id', 'nome', 'nick', 'imagem'],
            },
        });

        return response.status(200).json({
            data: seguindo.rows.map(usuario => ({
                usuario_id: usuario.Usuario.id,
                nome: usuario.Usuario.nome,
                nick: usuario.Usuario.nick,
                imagem: usuario.Usuario.imagem,
            })),
            total: seguindo.count,
        });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao buscar usuários seguidos', detalhe: error.message });
    }
};

export default { seguir, deixarSeguir, listarSeguidores, listarSeguindo };
