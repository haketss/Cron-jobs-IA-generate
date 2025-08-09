// automation.js
import dotenv from 'dotenv'
import cron from "node-cron";
import sql from "./db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: '.env' })

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const schema = {
    description: "Tabela de minerais",
    type: "array",
    items: {
        type: "object",
        properties: {
            nome: {
                type: "string",
                description: "nomeço do produto",
                maxLength: 100,
            },
            composicao_quimica: {
                type: "string",
                description: "composicao_quimica",
                maxLength: 100,
            },
        },
        required: ["nome", "composicao_quimica"],
    },
};

console.log("Script de automação iniciado. Aguardando agendamentos...");

cron.schedule("*/55 * * * * *", async () => {

  console.log("Executando a buasca por minerais...");
    const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });
            
  try {
    console.log("Conectando ao banco de dados...");

    const pergunta ="cite 10 minerais em um json divididos em, nome, composicao_quimica para cada mineral";
    const res = await model.generateContent([pergunta]);
    const minerais = JSON.parse(res.response.text());

    for (let i = 0; i < minerais.length; i++) {
      console.log("entrou no for", i);
      console.log("Mineral:", minerais[i].nome);
      const mineraisi  =
         sql`INSERT INTO minerais (nome, composicao_quimica) VALUES (${minerais[i].nome}, ${minerais[i].composicao_quimica})`;
     mineraisi;
    }


  } catch (error) {
    console.error("Erro ao executar a tarefa", error);
  }
});
