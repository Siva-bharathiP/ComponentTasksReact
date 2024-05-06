import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './board.css';
import './styles.css';
import { Card, CardContent } from '@mui/material';

const Board = () => {
  const staticStatuses = ["todo", "in-progress", "in-review", "completed"];

  const initialTasks = [
    {
      "id": 1,
      "title": "Task 1",
      "description": "This is the description for Task 1.",
      "status": "todo"
    },
    {
      "id": 8,
      "title": "Task 8",
      "description": "This is the description for Task 8.",
      "status": "todo"
    },
    {
      "id": 9,
      "title": "Task 9",
      "description": "This is the description for Task 9.",
      "status": "todo"
    },
    {
      "id": 7,
      "title": "Task 7",
      "description": "This is the description for Task 7.",
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
    
  ];

  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks || initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onDragStart = (event, taskId) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, status) => {
    const taskId = event.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map(task => {
      if (task.id.toString() === taskId) {
        return { ...task, status: status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };


  return (
    <div className="container d-flex">
      {staticStatuses.map((status, index) => (
        <div className="column" key={index} onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, status)}>
          <div className='cards'>
            <h4>{status}</h4>
            {tasks.filter(task => task.status === status).map((task, taskIndex) => (
              <div className="draggable-item" key={task.id.toString()} draggable="true" onDragStart={(event) => onDragStart(event, task.id.toString())}>
                <Card>
                  <CardContent>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                    <p>Status : {task.status}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
