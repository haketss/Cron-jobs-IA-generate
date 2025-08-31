import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,

})

const model = 'gemini-2.0-flash-001'


export async function generateElemento(nomeum: string, nomedois: string) {


    const prompt = `qual o resultado da mistura ou fusão desses dois elementos: ${nomeum} + ${nomedois}

    1: o resultado deve ser um json contendo o nome do novo elemento e um emoje mais proximo possivel do que pode ser o resultado.
   2: o nome do novo elemento deve ser curto, de preferencia uma unica palavra.
    3: o emoje deve ser um unico caractere.
    
   4: o json deve estar no seguinte formato:
   {
    "name": "nome do novo elemento",
    "emoji": "emoje do novo elemento"
   }

   
   `.trim()


    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: prompt
            },
              
            
        ]
    })
    


    if (!response.text) {
        throw new Error('Falha ao gerar resposta pelo Gemini')
    }
    return response.text
}