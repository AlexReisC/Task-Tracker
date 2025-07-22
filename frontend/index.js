const form = document.getElementById("new-task-form");
const tasksContainer = document.querySelector("#tasks-container");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const titleInput = document.getElementById("task-title");
    const descriptionInput = document.getElementById("task-description");
    
    if (titleInput.value.trim() === "") {
        alert("Titulo vazio!");
        return;
    }
    addTask(titleInput.value, descriptionInput.value);
});

tasksContainer.addEventListener("click", (ev) => {
    changeStatus(ev);
    
    if (ev.target.classList.contains("btn-edit")) {
        const btn = ev.target; 
        const task = btn.closest(".task");
        
        if (task.classList.contains("done")) return;
        
        const isEditing = btn.textContent === "Salvar";
        if (isEditing) {
            const input = task.querySelector(".edit-title");
            const newTitle = input.value.trim();

            if (input && newTitle !== "") {
                const span = document.createElement("span");
                span.classList.add("task-title");
                span.textContent = newTitle;
                task.replaceChild(span, input);

                const id = task.dataset.id;
                const description = span.title;
                const done = task.classList.contains("done");

                updateTask(id, { title: newTitle, description, done });
            }
            btn.textContent = "Editar";
        } else {
            const span = task.querySelector(".task-title");

            const input = document.createElement("input");
            input.classList.add("edit-title");
            input.type = "text";
            input.value = span.textContent;

            task.replaceChild(input, span);
            btn.textContent = "Salvar";
        }
    }

    if (ev.target.classList.contains("task-title")) {
        const span = ev.target;
        const divTask = span.closest(".task");
        const existingDescription = divTask.querySelector(".task-description");
        
        if (existingDescription) {
            existingDescription.remove(); 
            return;
        }

        const description = document.createElement("p");
        description.classList.add("task-description");
        description.textContent = span.title;
        divTask.appendChild(description);
    }
});

function renderTask(id, title, description, done) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.dataset.id = id;
    if(done) task.classList.add("done");
    
    const spanTitle = document.createElement("span");
    spanTitle.classList.add("task-title");
    spanTitle.textContent = title;
    spanTitle.title = description;
    task.appendChild(spanTitle);
    
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("btn-complete");
    completeBtn.textContent = done ? "Desfazer" : "Concluir";
    task.appendChild(completeBtn);
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn-edit");
    editBtn.textContent = "Editar";
    task.appendChild(editBtn);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.textContent = "Deletar";
    task.appendChild(deleteBtn);

    const container = document.getElementById("tasks-container");
    container.appendChild(task);

    return task;
}

function changeStatus(event) {
    if (event.target.classList.contains("btn-complete")) {
        const task = event.target.closest(".task");
        task.classList.toggle("done");
        const done = task.classList.contains("done");
        event.target.textContent = done ? "Desfazer" : "Concluir";
        updateTask(task.dataset.id, {done})
    }
    
    if (event.target.classList.contains("btn-delete")) {
        const task = event.target.closest(".task");
        task.remove();
        deleteTask(task.dataset.id);
    }
    
    return;
}

async function loadTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();

    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    for (const task of tasks) {
        renderTask(task.id, task.title, task.description, task.done);
    }
}
loadTasks();

async function addTask(title, description) {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            done: false
        })
    });

    if (response.ok) {
        loadTasks(); // recarrega lista
    } else {
        alert('Erro ao criar tarefa');
    }
}

async function updateTask(id, updateData) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });

    if(response.ok){
        loadTasks();
    } else {
        alert("Erro ao atualizar tarefa");
    }
}

async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        loadTasks();
    } else {
        alert("Erro ao deletar tarefa");
    }
}