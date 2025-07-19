const form = document.getElementById("new-task-form");
const tasksContainer = document.querySelector("#tasks-container");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    document.getElementById('task-title').value

    const titleInput = document.getElementById("task-title");
    const descriptionInput = document.getElementById("task-description");
    
    if (titleInput.value.trim() === "") {
        alert("Titulo vazio!");
        return;
    }

    const task = document.createElement("div");
    task.setAttribute("class", "task");
    
    const spanTitle = document.createElement("span");
    spanTitle.setAttribute("class", "task-title");
    spanTitle.textContent = titleInput.value;
    spanTitle.title = descriptionInput.value;
    task.appendChild(spanTitle);

    /* const description = document.createElement("p");
    description.setAttribute("class", "task-description");
    description.textContent = descriptionInput.value;
    task.appendChild(description); */
    
    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("class", "btn-complete");
    completeBtn.textContent = "Concluir";
    task.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "btn-delete");
    deleteBtn.textContent = "Deletar";
    task.appendChild(deleteBtn);

    const container = document.getElementById("tasks-container");
    container.appendChild(task);

    titleInput.value = "";
    descriptionInput.value = "";
});

tasksContainer.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("btn-complete")) {
        const task = ev.target.closest(".task");
        task.classList.toggle("done");
        ev.target.textContent = task.classList.contains("done") ? "Desfazer" : "Concluir";
    }
    if (ev.target.classList.contains("btn-delete")) {
        const task = ev.target.closest(".task");
        task.remove();
    }
    if (ev.target.classList.contains("btn-edit")) {
        const btn = ev.target;
        
        const task = btn.closest(".task");
        if (task.classList.contains("done")) return;
        
        const isEditing = btn.textContent === "Salvar";
        if (isEditing) {
            const input = task.querySelector(".edit-title");
            const newTitle = input.value.trim();

            if (innput & newTitle !== "") {
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
});
