const todoList = document.querySelector("#todo-list");
const newTodoInput = document.querySelector("#new-todo");
const activeButton = document.querySelector("#active");
const completedButton = document.querySelector("#completed");
const allButton = document.querySelector("#all");
const clearCompletedButton = document.querySelector("#clear-completed");

const tasks = [
  { title: "Task 1", completed: false },
  { title: "Task 2", completed: false },
  { title: "Task 3", completed: false },
  { title: "Task 4", completed: false },
  { title: "Task 5", completed: false },
];

function renderTodos(items) {
  // clear the list
  todoList.innerHTML = "";
  items.forEach((item, index) => {
    todoList.innerHTML += `
            <li data-key=${index} class="todo-item">
                <input ${
                  item.completed ? "checked" : ""
                } type="checkbox" class="todo-checkbox">
                <span class=${item.completed ? "completed" : ""}>${
      item.title
    }</span>
            </li>
            <button class="delete-todo">Delete</button>
        `;
  });

  marksAsCompleted();
}

// add todo on enter key
newTodoInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    addTodo();
  }
});

// highlight active button
activeButton.addEventListener("click", () => {
  activeButton.classList.add("active");
  completedButton.classList.remove("active");
  allButton.classList.remove("active");
});

// highlight completed button
completedButton.addEventListener("click", () => {
  completedButton.classList.add("active");
  activeButton.classList.remove("active");
  allButton.classList.remove("active");
});

// highlight all button
allButton.addEventListener("click", () => {
  allButton.classList.add("active");
  activeButton.classList.remove("active");
  completedButton.classList.remove("active");
});

// add new todo
function addTodo() {
  const input = document.querySelector("#new-todo");
  const todo = input.value;
  if (todo !== "") {
    const todoItem = {
      title: todo,
      completed: false,
    };
    tasks.push(todoItem);
    input.value = "";
    todoList.innerHTML = "";
    renderTodos(tasks);
  }
}

// filter function by active, completed and all todos
function filterTodosActive() {
  activeButton.addEventListener("click", () => {
    const activeTodos = tasks.filter((todo) => todo.completed === false);
    renderTodos(activeTodos);
  });
}

filterTodosActive();

// completed filter function by active, completed and all todos
function filterTodosByCompleted() {
  completedButton.addEventListener("click", () => {
    const completedTodos = tasks.filter((todo) => todo.completed === true);
    renderTodos(completedTodos);
  });
}

filterTodosByCompleted();

// all filter function by active, completed and all todos
function filterTodosAll() {
  allButton.addEventListener("click", () => {
    renderTodos(tasks);
  });
}

filterTodosAll();

// clear completed todos, e.g. completed todos will be deleted
function clearCompletedTodos() {
  clearCompletedButton.addEventListener("click", () => {
    const completedTodos = tasks.filter((todo) => todo.completed === true);
    completedTodos.forEach((todo) => {
      const todoIndex = tasks.indexOf(todo);
      tasks.splice(todoIndex, 1);
    });
    renderTodos(tasks);
  });
}

clearCompletedTodos();

// check off todos by clicking on them and change the completed property to true
function marksAsCompleted() {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((todoItem) => {
    const checkbox = todoItem.querySelector(".todo-checkbox");
    checkbox.addEventListener("click", (e) => {
      const todoIndex = todoItem.getAttribute("data-key");
      tasks[todoIndex].completed = !tasks[todoIndex].completed;
      todoItem.children[1].classList.toggle("completed", tasks[todoIndex].completed);
    });
  });
}


function deleteTodos() {
  const deleteButtons = document.querySelectorAll(".delete-todo");
  deleteButtons.forEach((button, idx) => {
    button.addEventListener("click", (e) => {
      console.log(idx);
      tasks.splice(idx, 1);
      renderTodos(tasks);
    });
  });
}

renderTodos(tasks);
deleteTodos();
