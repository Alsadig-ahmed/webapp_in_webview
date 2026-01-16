const taskListEl = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');

let tasks = [];

// Fetch mock data from JSON file
async function loadTasks() {
  try {
    const response = await fetch('tasks.json');
    tasks = await response.json();
    renderTasks();
  } catch (err) {
    console.error('Failed to load tasks:', err);
  }
}

// Render tasks to DOM
function renderTasks() {
  taskListEl.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    
    const span = document.createElement('span');
    span.textContent = task.title;
    span.addEventListener('click', () => toggleComplete(task.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskListEl.appendChild(li);
  });
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  const title = newTaskInput.value.trim();
  if (title) {
    const newTask = { id: Date.now(), title, completed: false };
    tasks.push(newTask);
    renderTasks();
    newTaskInput.value = '';
  }
});

// Toggle complete
function toggleComplete(id) {
  tasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Initialize
loadTasks();