import React from 'react';

// Functional component to display a single task
const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.completed ? 'Done ✅' : 'Pending ⏳'}</p>
            
            <button onClick={() => onToggle(task.id, !task.completed)}>
                {task.completed ? 'Mark Pending' : 'Mark Done'}
            </button>
            <button onClick={() => onDelete(task.id)} style={{ marginLeft: '10px', color: 'red' }}>
                Delete
            </button>
        </div>
    );
};

export default TaskItem;