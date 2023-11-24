// src/components/TaskForm.js

import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Media');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
    setPriority('Media');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nueva Tarea:
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <label>
        Prioridad:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </label>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default TaskForm;
