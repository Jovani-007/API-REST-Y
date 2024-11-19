import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';
import Usuario from "./Usuario.js";
import Publicacao from "./Publicacao.js";

const Comentario = sequelize.define('Comentario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    publicacao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Publicacoes',
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Comentario',
    tableName: 'comentarios', 
    timestamps: true,         
});


Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Comentario.belongsTo(Publicacao, { foreignKey: 'publicacao_id', as: 'publicacao' });

(async () => {
    await sequelize.sync();
})();

export default Comentario;