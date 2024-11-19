    import Usuario from '../models/Usuarios.js';

    const criarUsuario = async (request, response) => {
        const { nome, email, senha, nascimento, nick, imagem } = request.body;

        if (!nome || !email || !senha || !nascimento || !nick || !imagem) {
            return response.status(400).json({ erro: 'Todos os campos são obrigatórios' });
        }

        const dataNascimento = new Date(nascimento);
        const idade = new Date().getFullYear() - dataNascimento.getFullYear();
        if (idade < 16) {
            return response.status(400).json({ erro: 'A idade deve ser maior que 16 anos' });
        }

        try {
            const novoUsuario = await Usuario.create({ nome, email, senha, nascimento, nick, imagem });
            return response.status(201).json(novoUsuario);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return response.status(400).json({ erro: "Email ou nick já está em uso" });
            }
            return response.status(500).json({ erro: 'Erro ao criar o usuário', detalhe: error.message });
        }
    }

const listarUsuarios = async (request, response) => {
    const { search } = request.query;
    
    try {
        let usuarios;
        if (search) {
            usuarios = await Usuario.findAll({
                where: {
                    [Op.or]: [
                        { nome: { [Op.like]: `%${search}` } },
                        { nick: { [Op.like]: `%${search}` } }
                    ]
                }
            });
        } else {
            usuarios = await Usuario.findAll();
        }

        return response.status(200).json(usuarios);

    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao buscar usuários', detalhe: error.message })
    }
}

const detalharUsuario = async (request, response) => {
    const { usuario_id } = request.params;

    try {
        const usuario = await Usuario.findByPk(usuario_id);

        if (!usuario) {
            return response.status(404).json({ erro: 'Usuário não encontrado' });
        }

        return response.status(200).json({
            nome: usuario.nome,
            email: usuario.email,
            nick: usuario.nick,
            imagem: usuario.imagem,
            nascimento: usuario.nascimento
        });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao buscar o usuário', detalhe: error.message });
    }
}

const atualizarUsuario = async (request, response) => {
    const { usuario_id } = request.params;
    const { nome, email, nick } = request.body;

    if (!nome && !email && !nick) {
        return response.status(400).json({ erro: 'Pelo menos um campo deve ser fornecido' });
    }

    try {
        const usuario = await Usuario.findByPk(usuario_id);

        if (!usuario) {
            return response.status(404).json({ erro: 'Usuário não encontrado' });
        }

        if (email) {
            const emailExistente = await Usuario.findOne({ where: { email } });
            if (emailExistente && emailExistente.id !== usuario.id) {
                return response.status(400).json({ erro: 'Email já está em uso' });
            }
        }

        if (nick) {
            const nickExistente = await Usuario.findOne({ where: { nick } });
            if (nickExistente && nickExistente.id !== usuario.id) {
                return response.status(400).json({ erro: 'Nick já está em uso' });
            }
        }

        usuario.nome = nome || usuario.nome;
        usuario.email = email || usuario.email;
        usuario.nick = nick || usuario.nick;
        
        const updatedUsuario = await usuario.save();

        if (!updatedUsuario) {
            return response.status(400).json({ erro: 'Falha ao atualizar o usuário' });
        }

        return response.status(200).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nick: usuario.nick,
            imagem: usuario.imagem,
            nascimento: usuario.nascimento,
        });
    } catch (error) {
        return response.status(500).json({ erro: 'Erro ao atualizar o usuario' });
    }
}

export default { criarUsuario, listarUsuarios, detalharUsuario, atualizarUsuario };