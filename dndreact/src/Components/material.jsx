import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // or any other backend you prefer
import { Card, CardContent, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import './board.css';
import './styles.css';

const initialTasks = [
  {
    "id": 1,
    "title": "Task 1",
    "description": "This is the description for Task 1.",
    "status": "todo"
  },
  {
    "id": 1,
    "title": "Task 1",
    "description": "This is the description for Task 1.",
    "status": "todo"
  },
  {
    "id": 1,
    "title": "Task 1",
    "description": "This is the description for Task 1.",
    "status": "in-progress"
  },
  {
    "id": 5,
    "title": "Task 5",
    "description": "This is the description for Task 5.",
    "status": "todo"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "This is the description for Task 2.",
    "status": "in-progress"
  },
  {
    "id": 3,
    "title": "Task 3",
    "description": "This is the description for Task 3.",
    "status": "in-review"
  },
  {
    "id": 4,
    "title": "Task 4",
    "description": "This is the description for Task 4.",
    "status": "completed"
  },
  {
    "id": 6,
    "title": "Task 6",
    "description": "This is the description for Task 4.",
    "status": "completed"
  }
];

const Board1 = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (dragIndex, hoverIndex) => {
    const draggedTask = tasks[dragIndex];
    const newTasks = [...tasks];
    newTasks.splice(dragIndex, 1); // Remove dragged task from its original position
    newTasks.splice(hoverIndex, 0, { ...draggedTask, status: getStatusFromIndex(hoverIndex) }); // Insert dragged task at the new position with updated status
    setTasks(newTasks);
  };

  // Function to get the status based on the index of the column where the task is dropped
  const getStatusFromIndex = (index) => {
    switch (index) {
      case 0:
        return 'todo';
      case 1:
        return 'in-progress';
      case 2:
        return 'in-review';
      case 3:
        return 'completed';
      default:
        return 'todo'; // Default status
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container d-flex">
        {/* Single Droppable Area */}
        <div className="column">
          {tasks.map((task, index) => (
            <Task key={task.id} index={index} task={task} moveTask={moveTask} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

const Task = ({ task, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'task', id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => moveTask(item.index, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  const backgroundColor = isOver ? '#f0f0f0' : '#ffffff';

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity, backgroundColor }} className="draggable-item">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {task.title}
          </Typography>
          <Typography variant="body2" component="p">
            {task.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Board1;
