import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database.js";
import Usuarios from "./Usuarios.js";
import Publicacoes from "./Publicacoes.js";

class Comentarios extends Model {};

Comentarios.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    publicacao_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qtd_likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Comentarios",
    timestamps: false
  }
);

Comentarios.belongsTo(Usuarios, { foreignKey: "usuario_id" });
Comentarios.belongsTo(Publicacoes, { foreignKey: "publicacao_id" });
Publicacoes.hasMany(Comentarios, { foreignKey: 'publicacao_id' });

export default Comentarios;