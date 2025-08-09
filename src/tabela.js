import Sql from "./db.js";

const createTable = async () => {
  try {
    await Sql`
      CREATE TABLE IF NOT EXISTS minerais (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        composicao_quimica VARCHAR(100)
      );`;
    console.log("Tabela 'minerais' criada ou já existe.");

    await Sql.end();
    process.exit(0);
  } catch (error) {
    console.error("Ocorreu um erro ao configurar o banco de dados:", error);
    process.exit(1);
  }
};

createTable();