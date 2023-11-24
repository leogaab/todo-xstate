// TaskItem.js

import React, { useState } from 'react';

const TaskItem = ({ task, onToggleStatus, onDelete, onSetPriority, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(task.id, editedText, editedPriority);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
          <button onClick={handleSaveEdit}>Guardar</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: task.status === 'Finalizado' ? 'line-through' : 'none',
              marginRight: '8px',
            }}
            onClick={() => onToggleStatus(task.id)}
          >
            {task.text} - Prioridad: {task.priority}
          </span>
          <button onClick={handleEdit}>Editar</button>
        </>
      )}
      <button onClick={handleDelete}>Eliminar</button>
    </li>
  );
};

export default TaskItem;
