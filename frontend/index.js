const form = document.getElementById("new-task-form");

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

// mudar classe task para task done se a tarefa for concluida