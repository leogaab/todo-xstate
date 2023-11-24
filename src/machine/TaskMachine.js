import { createMachine, assign } from 'xstate';

const taskMachine = createMachine(
  {
    id: 'tasks',
    initial: 'idle',
    context: {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    },
    states: {
      idle: {
        on: {
          ADD: {
            target: 'idle',
            actions: assign({
              tasks: (context, event) => {
                const newTasks = [
                  ...context.tasks,
                  { id: Date.now(), text: event.text, status: 'En Progreso', priority: event.priority || 'Media' },
                ];
                localStorage.setItem('tasks', JSON.stringify(newTasks));
                return newTasks;
              },
            }),
          },
          TOGGLE_STATUS: {
            target: 'idle',
            actions: assign({
              tasks: (context, event) =>
                context.tasks.map(task =>
                  task.id === event.id
                    ? { ...task, status: task.status === 'En Progreso' ? 'Finalizado' : 'En Progreso' }
                    : task
                ),
            }),
          },
          SET_PRIORITY: {
            target: 'idle',
            actions: assign({
              tasks: (context, event) =>
                context.tasks.map(task =>
                  task.id === event.id
                    ? { ...task, priority: event.priority }
                    : task
                ),
            }),
          },
          EDIT_TASK: {
            target: 'idle',
            actions: assign({
              tasks: (context, event) =>
                context.tasks.map(task =>
                  task.id === event.id
                    ? { ...task, text: event.text, priority: event.priority }
                    : task
                ),
            }),
          },
          DELETE_TASK: {
            target: 'idle',
            actions: assign({
              tasks: (context, event) =>
                context.tasks.filter(task => task.id !== event.id),
            }),
          },
        },
      },
    },
    // Configuración de opciones (opcional)
  }
);

export default taskMachine;
