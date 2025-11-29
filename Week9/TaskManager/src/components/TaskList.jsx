import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
}