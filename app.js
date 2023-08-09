//Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', todoFilters);

//Functions
function addTodo(event) {
    console.log('Testing Function');
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create <li>
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add Todo to Local Storeage
    saveLocalTodos(todoInput.value);

    //Checked Button
    const CompletedButton = document.createElement('button');
    CompletedButton.innerHTML = 'Completed';
    CompletedButton.classList.add("completed-btn");
    todoDiv.appendChild(CompletedButton);

    //Delete Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = 'Trash';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to List
    todoList.appendChild(todoDiv)

    //Clear todoInput
    todoInput.value = "";
}
function deleteCheck(e) {
    console.log(e.target);
    const item = e.target;
    // Delete Todo
    if (item.classList[0] === "trash-btn") {
        const Del = item.parentElement;

        Del.classList.add("fall");
        removeLocalTodos(Del);
        Del.addEventListener("transitionend", function () {
            Del.remove();
        });
    }

    // Check Todo
    if (item.classList[0] === "completed-btn") {
        const Check = item.parentElement;
        Check.classList.toggle("completed");
    }
};
function todoFilters(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if (todo.nodeType == Node.ELEMENT_NODE) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            };
        }
    });
}

function saveLocalTodos(todo) {
    //Check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos() {
    //Check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create <li>
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Checked Button
        const CompletedButton = document.createElement('button');
        CompletedButton.innerHTML = 'Completed';
        CompletedButton.classList.add("completed-btn");
        todoDiv.appendChild(CompletedButton);

        //Delete Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = 'Trash';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to List
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo) {
    //Check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todo);
}