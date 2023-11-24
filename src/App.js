// src/App.js

import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import TaskMachine from './machine/TaskMachine';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const [state, send] = useMachine(TaskMachine);
  const [filterByStatus, setFilterByStatus] = useState(null);
  const [filterByPriority, setFilterByPriority] = useState(null);

  const handleAddTask = (text, priority) => {
    send({ type: 'ADD', text, priority });
  };

  const handleToggleStatus = (id) => {
    send({ type: 'TOGGLE_STATUS', id });
  };

  const handleSetPriority = (id, priority) => {
    send({ type: 'SET_PRIORITY', id, priority });
  };

  const handleEditTask = (id, text, priority) => {
    send({ type: 'EDIT_TASK', id, text, priority });
  };

  const handleDeleteTask = (id) => {
    send({ type: 'DELETE_TASK', id });
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div>
        <button onClick={() => setFilterByStatus(null)}>Todas</button>
        <button onClick={() => setFilterByStatus('En Progreso')}>En Progreso</button>
        <button onClick={() => setFilterByStatus('Finalizado')}>Finalizado</button>
        <select onChange={(e) => setFilterByPriority(e.target.value)}>
          <option value="">Todas las Prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>
      <TaskForm onAdd={handleAddTask} />
      <TaskList
        tasks={state.context.tasks}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteTask}
        onSetPriority={handleSetPriority}
        onEdit={handleEditTask}
        filterByStatus={filterByStatus}
        filterByPriority={filterByPriority}
      />
    </div>
  );
};

export default App;
