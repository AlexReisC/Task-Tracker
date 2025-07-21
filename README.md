# Task Tracker
Task Tracker é um mini sistema de gerenciamento de tarefas que permite aos usuários gerenciar suas tarefas de forma simples e eficiente.

## Funcionalidades
- Criação de tarefas com título e descrição
- Listagem de tarefas
- Marcação de tarefas como concluídas
- Editar tarefas
- Deleção de tarefas
- Persistência de dados em um arquivo JSON (Em desenvolvimento)

## Tecnologias Utilizadas
- Frontend: JavaScript, HTML, CSS
- Backend: Node.js, Express (Em desenvolvimento)
- Banco de Dados: JSON (Em desenvolvimento)

## API
A API do Task Tracker permite a interação com as tarefas através de requisições HTTP. As principais rotas disponíveis são:

### Tarefas
- `GET /tasks`: Lista todas as tarefas
- `POST /tasks`: Cria uma nova tarefa
- `PUT /tasks/:id`: Atualiza uma tarefa existente
- `DELETE /tasks/:id`: Deleta uma tarefa

### Exemplo de Requisição
```json
{
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa",
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
