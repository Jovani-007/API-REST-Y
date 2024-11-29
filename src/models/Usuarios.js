import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database.js";

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Usuarios",
    createdAt: "criado_em",
    //timestamps: true,
    timestamps: false,
    updatedAt: false
  }
);

export default Usuario;
