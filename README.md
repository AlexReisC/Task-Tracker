# Task Tracker
Task Tracker é um mini sistema de gerenciamento de tarefas que permite aos usuários gerenciar suas tarefas de 
forma simples e eficiente.

![Local Image](./frontend/assests/Captura%20de%20tela%202025-08-12%20142059.png "Task Tracker")

## Funcionalidades
- Criação de tarefas com título e descrição
- Listagem de tarefas
- Marcação de tarefas como concluídas
- Editar tarefas
- Deleção de tarefas
- Persistência de dados em um arquivo JSON

## Tecnologias Utilizadas
- Frontend: JavaScript, HTML, CSS
- Backend: Node.js, Fastify
- Banco de Dados: JSON local//

## API
A API do Task Tracker permite a interação com as tarefas através de requisições HTTP. As principais rotas disponíveis são:

### Rotas
- `GET /tasks`: Lista todas as tarefas
- `POST /tasks`: Cria uma nova tarefa
- `PATCH /tasks/:id`: Atualiza uma tarefa existente
- `DELETE /tasks/:id`: Deleta uma tarefa

### Exemplo de Requisição POST
```json
{
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa",
  "done": false
}
```
### Exemplo de Resposta 
```json
{
  "id": 1,
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa",
  "completed": false
}
```

### Exemplo de Requisição PATCH
```json
{
  "title": "Tarefa Atualizada"
}
```
### Exemplo de Resposta de sucesso 
```http
HTTP/1.1 204 No Content
```

### Exemplo de Resposta de erro
```json
{
  "message": "Tarefa não encontrada"
}
```

## Instalação e Execução
Para instalar o Task Tracker, siga os passos abaixo:
1. Clone o repositório: `git clone https://github.com/AlexReisC/Task-Tracker.git`
2. Navegue até o diretório do projeto: `cd Task-Tracker`
3. Navegue até o diretório `backend` e instale as dependências: `npm install`
4. Inicie o servidor: `npm start`
5.  Abra o navegador e acesse `http://localhost:3000`
6. Comece a gerenciar suas tarefas!

## Como Contribuir
Para contribuir com o Task Tracker, siga os passos abaixo:
1. Faça um fork do repositório
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova feature'`). Explique claramente o que foi alterado.
4. Envie para o repositório remoto (`git push origin feature/nova-feature`)
5. Crie um Pull Request
6. Aguarde a revisão e aprovação do Pull Request
