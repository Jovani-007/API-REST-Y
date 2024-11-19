import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';

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
        type: DataTypes.INTEGER,  
        allowNull: false,
        references: {
            model: 'Usuarios',  
            key: 'id'           
        }
    }
}, {
    sequelize,
    modelName: 'Publicacao',
    tableName: 'publicacoes', 
    timestamps: true          
});

Publicacao.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

(async () => {
    await sequelize.sync();
})();

export default Publicacao;
