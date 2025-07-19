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

    createTask(titleInput, descriptionInput);
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
        const taskDescription = document.querySelector(".task-description");
        if (taskDescription) {
            taskDescription.remove(); 
            return;
        }

        const span = ev.target;
        const divTask = span.closest(".task");
        
        const description = document.createElement("p");
        description.classList.add("task-description");
        description.textContent = span.title;

        divTask.appendChild(description);
    }
});

function createTask(title, description) {
    const task = document.createElement("div");
    task.classList.add("task");
    
    const spanTitle = document.createElement("span");
    spanTitle.classList.add("task-title");
    spanTitle.textContent = title.value;
    spanTitle.title = description.value;
    task.appendChild(spanTitle);
    
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("btn-complete");
    completeBtn.textContent = "Concluir";
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

    title.value = "";
    description.value = "";

    return task;
}

function changeStatus(event) {
    if (event.target.classList.contains("btn-complete")) {
        const task = event.target.closest(".task");
        task.classList.toggle("done");
        event.target.textContent = task.classList.contains("done") ? "Desfazer" : "Concluir";
    }
    
    if (event.target.classList.contains("btn-delete")) {
        const task = event.target.closest(".task");
        task.remove();
    }
    
    return;
}