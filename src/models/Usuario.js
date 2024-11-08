import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nick: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    imagem: {
        type: DataTypes.STRING,
        defaultValue: "http://example.com/imagem.png"
    }
});

(async () => {
    await sequelize.sync();
})();

export default Usuario;