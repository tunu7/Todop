// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await axios.get('http://localhost:5000/api/todos');
        setTodos(res.data);
    };

    const addTodo = async () => {
        if (!text) return;
        const res = await axios.post('http://localhost:5000/api/todos', { text });
        setTodos([...todos, res.data]);
        setText('');
    };

    const toggleComplete = async (todo) => {
        const res = await axios.patch(`http://localhost:5000/api/todos/${todo._id}`, { completed: !todo.completed });
        setTodos(todos.map(t => (t._id === todo._id ? res.data : t)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        setTodos(todos.filter(t => t._id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
            <h1 className="text-4xl font-bold mb-6 text-white">To-Do List</h1>
            <div className="flex w-full max-w-md mb-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-1 border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button 
                    onClick={addTodo}
                    className="bg-yellow-500 text-white rounded-r-md px-4 hover:bg-yellow-600 transition duration-200"
                >
                    Add
                </button>
            </div>
            <ul className="w-full max-w-md">
                {todos.map((todo) => (
                    <li 
                        key={todo._id} 
                        className={`flex justify-between items-center p-2 mb-2 rounded-md bg-white shadow ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                    >
                        <span>{todo.text}</span>
                        <div>
                            <button 
                                onClick={() => toggleComplete(todo)}
                                className={`px-4 py-2 rounded-lg transition duration-200 ${todo.completed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} hover:opacity-80`}
                            >
                                {todo.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button 
                                onClick={() => deleteTodo(todo._id)}
                                className="bg-red-500 text-white rounded-lg px-4 py-2 ml-2 hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
