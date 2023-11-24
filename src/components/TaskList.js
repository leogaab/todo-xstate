// src/components/TaskList.js

import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleStatus, onDelete, onSetPriority, onEdit, filterByStatus, filterByPriority }) => {
  // Filtrar y ordenar tareas según el estado y prioridad seleccionados
  const filteredTasks = tasks
    .filter(task => (filterByStatus ? task.status === filterByStatus : true))
    .filter(task => (filterByPriority ? task.priority === filterByPriority : true))
    .sort((a, b) => (a.priority < b.priority ? 1 : -1));

  return (
    <ul>
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onSetPriority={onSetPriority}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TaskList;
