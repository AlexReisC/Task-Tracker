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
    const target = ev.target;
    toggleDoneStatus(target);
    
    if (target.classList.contains("btn-edit")) {
        const task = getTaskElement(target);
        
        if (!task.classList.contains("done")) {
            toggleEditMode(task, target);
        }
    }

    if (target.classList.contains("task-title")) {
        toggleDescription(target);
    }

});

function getTaskElement(button) {
    return button.closest(".task");
}

function getTaskId(task) {
    return task.dataset.id;
}

function createElement(tag, className, textContent = '', attributes = {}) {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    if (textContent) el.textContent = textContent;
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }
    return el;
}

function renderTask(id, title, description, done) {
    const task = createElement("div", "task");
    task.dataset.id = id;
    if(done) task.classList.add("done");
    
    const spanTitle = createElement("span", "task-title", title, {title: description});
    task.appendChild(spanTitle);
    
    const completeBtn = createElement("button", "btn-complete", done ? "Desfazer" : "Concluir");
    const editBtn = createElement("button", "btn-edit", "Editar");
    const deleteBtn = createElement("button", "btn-delete", "Deletar");
    
    task.appendChild(completeBtn);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);
    
    tasksContainer.appendChild(task);
    return task;
}

function toggleDoneStatus(target) {
    const task = getTaskElement(target);

    if(!target) return;

    if (target.classList.contains("btn-complete")) {
        task.classList.toggle("done");
        const done = task.classList.contains("done");
        target.textContent = done ? "Desfazer" : "Concluir";
        updateTask(getTaskId(task), { done })
    }
    
    if (target.classList.contains("btn-delete")) {
        task.remove();
        deleteTask(getTaskId(task));
    }
}

function toggleEditMode(task, btn) {
    const isEditing = btn.textContent === "Salvar";

    if (isEditing) {
        const input = task.querySelector(".edit-title");
        const newTitle = input.value.trim();
        if (input && newTitle !== "") {
            const span = createElement("span", "task-title", newTitle, { title: input.title || "" });
            task.replaceChild(span, input);

            updateTask(getTaskId(task), {
                title: newTitle,
                description: span.title,
                done: task.classList.contains("done")
            });
        }
        btn.textContent = "Editar";
    } else {
        const span = task.querySelector(".task-title");
        const input = createElement("input", "edit-title", '', {
            type: "text",
            value: span.textContent
        });
        input.title = span.title;
        task.replaceChild(input, span);
        btn.textContent = "Salvar";
    }
}

function toggleDescription(span) {
    const task = getTaskElement(span);
    const existing = task.querySelector(".task-description");
    if (existing) {
        existing.remove();
        return;
    }

    const desc = createElement("p", "task-description", span.title);
    task.appendChild(desc);
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
        loadTasks();
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