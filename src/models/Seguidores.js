import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database.js";
import Usuarios from "./Usuarios.js";

class Seguidores extends Model {}

Seguidores.init(
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
    seguidor_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Seguidores",
  }
);
Seguidores.belongsTo(Usuarios, { foreignKey: "usuario_id" });
Seguidores.belongsTo(Usuarios, { foreignKey: "seguidor_id" });

export default Seguidores;
