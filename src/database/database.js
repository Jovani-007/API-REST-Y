import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: '../database.sqlite'
// });

dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_PROD_NAME,
    process.env.DB_PROD_USER,
    process.env.DB_PROD_PASSWORD,
    {
        host: process.env.DB_PROD_HOST,
        port: process.env.DB_PROD_PORT,
        dialect: process.env.DB_PROD_DIALECT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados: ', error);
    }
})();

export default sequelize;