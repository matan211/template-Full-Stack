import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../api/taskApi';
import TaskItem from '../components/TaskItem';

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    // Load tasks on component mount
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (error) {
            console.error('Failed to load tasks', error);
        }
    };

    const handleCreate = async () => {
        if (!newTaskTitle) return;
        try {
            await addTask({ title: newTaskTitle, description: 'Created during interview' });
            setNewTaskTitle('');
            loadTasks(); // Refresh list
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    const handleToggle = async (id, completed) => {
        try {
            await updateTask(id, { completed });
            loadTasks();
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            loadTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Task Manager</h1>
            
            {/* Simple input for creating tasks */}
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    value={newTaskTitle} 
                    onChange={(e) => setNewTaskTitle(e.target.value)} 
                    placeholder="New Task Title"
                />
                <button onClick={handleCreate}>Add Task</button>
            </div>

            {/* Render list of tasks */}
            <div>
                {tasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onToggle={handleToggle} 
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;