import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';

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
            model: 'Publicacao', 
            key: 'id',           
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',   
            key: 'id',           
        }
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Comentarios', 
    timestamps: true,         
});

(async () => {
    await sequelize.sync();
})();

export default Comentario;