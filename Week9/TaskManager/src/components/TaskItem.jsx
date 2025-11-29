export default function TaskItem({ task, toggleTask, deleteTask }) {
    return (
      <div className={`task-item ${task.completed ? 'completed' : ''}`}>
        <span onClick={() => toggleTask(task.id)}>
          {task.text}
        </span>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    );
  }
  