
let userInput = document.getElementById('task');
let newTask = document.getElementById('new-task');
let todos = JSON.parse(localStorage.getItem('todo-list'));

// calling add function by Enter button
userInput.addEventListener('keyup', (e) => {
  if (e.key == 'Enter') {
    add();
  }
})

// calling function by button
function add() {
  let userTask = userInput.value;
  if (userTask.length == 0) {
    alert("Please Enter Some Task !")
  }
  else {
    if (!todos) {
      todos = [];
    }
    let userInfo = { task: userTask, status: 'pending' };
    todos.push(userInfo)

    localStorage.setItem('todo-list', JSON.stringify(todos));
    userInput.value = '';

    createTodo();
  }
}

// creating task list

let createTodo = () => {
  let li = '';
  if (todos) {
    todos.forEach((todo, index) => {
      let isCompleted = todo.status === 'completed' ? 'checked' : '';
      li += `<li class="task">
   <div>  <input type="checkbox" onclick="check(this)" name="" id="${index}" ${isCompleted}/>
<span class="${isCompleted}">${todo.task}</span></div>
<button class="remove" onclick="deleteTask(${index})"><img src="./delete.png" width="20px"/></button>
</li>`;
    })
  }
  newTask.innerHTML = li || `<span class='no-task-msg'>No Task Found!</span>`;
}

// delete task

let deleteTask = (deleteId) => {
  todos.splice(deleteId, 1)
  localStorage.setItem('todo-list', JSON.stringify(todos));
  createTodo();
}

// checkbox 

let check = (currentTask) => {
  if (currentTask.checked) {
    currentTask.nextElementSibling.classList.add('checked');
    todos[currentTask.id].status = 'completed';
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }

  else {
    currentTask.nextElementSibling.classList.remove('checked');
    todos[currentTask.id].status = 'pending';
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }
}
createTodo();