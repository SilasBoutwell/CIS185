document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const taskCountElement = document.getElementById('task-count');
  const filterButtons = document.getElementById('filter-buttons');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let currentFilter = 'all';

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'active') {
        return !task.completed;
      }
      if (currentFilter === 'completed') {
        return task.completed;
      }
      return true;
    });

    if (filteredTasks.length === 0) {
      taskList.innerHTML = '<li class="no-tasks">No tasks to show.</li>';
    } else {
      filteredTasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.dataset.id = task.id;
        if (task.completed) {
          taskElement.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        taskElement.appendChild(checkbox);
        taskElement.appendChild(textSpan);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
      });
    }

    updateTaskCount();
  };

  // --- Task Management Functions ---
  const addTask = (text) => {
    if (text.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
  };

  const toggleTaskCompletion = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    }
  };

  const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  };

  const updateTaskCount = () => {
    const activeTasksCount = tasks.filter(task => !task.completed).length;
    taskCountElement.textContent = `${activeTasksCount} task${activeTasksCount !== 1 ? 's' : ''} left`;
  };

  // --- Event Listeners ---
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskInput.value);
    taskInput.value = ''; 
  });

  filterButtons.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const filter = e.target.dataset.filter;
      if (filter) {
        currentFilter = filter;
        document.querySelectorAll('#filter-buttons button').forEach(btn => {
          btn.classList.remove('active');
        });
        e.target.classList.add('active');
        renderTasks();
      }
    }
  });

  renderTasks();
});