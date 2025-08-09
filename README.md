# Projeto de Cron Job com IA Generativa

Este projeto utiliza um cron job para buscar dados de uma API de IA Generativa e armazená-los em um banco de dados PostgreSQL.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução para o JavaScript.
- **PostgreSQL:** Banco de dados relacional para armazenar os dados.
- **Docker:** Para facilitar a configuração e execução do banco de dados PostgreSQL.
- **node-cron:** Biblioteca para agendamento de tarefas (cron jobs).
- **@google/generative-ai:** Biblioteca para interação com a API de IA Generativa do Google.
- **dotenv:** Para carregar variáveis de ambiente a partir de um arquivo `.env`.
- **postgres:** Biblioteca para interagir com o banco de dados PostgreSQL.

## Setup e Configuração

### Pré-requisitos

- Node.js instalado
- Docker instalado

### Passos

1. **Clonar o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-diretorio>
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar o banco de dados:**
   - Inicie o container do PostgreSQL com o Docker Compose:
     ```bash
     docker-compose up -d
     ```

4. **Configurar as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione a sua chave da API do Gemini no arquivo `.env`:
     ```
     GEMINI_API_KEY=SUA_CHAVE_DA_API_AQUI
     ```

5. **Criar a tabela no banco de dados:**
    ```bash
    npm run create-table
    ```

6. **Executar a aplicação:**
   ```bash
   npm start
   ```

## Estrutura do Projeto

- **`src/cron-test.js`**: Arquivo principal que contém a lógica do cron job.
- **`src/db.js`**: Configuração da conexão com o banco de dados PostgreSQL.
- **`src/tabela.js`**: Script para criar a tabela `minerais` no banco de dados.
- **`docker-compose.yaml`**: Arquivo de configuração do Docker Compose para o banco de dados.
- **`package.json`**: Arquivo de configuração do projeto Node.js, com as dependências e scripts.