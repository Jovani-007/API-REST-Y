import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Publicacao = sequelize.define('Publicacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    publicacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

(async () => {
    await sequelize.sync();
})();

export default Publicacao;